import { PlanetTotals, ProjectsWithCost } from '.';
import { X4TerraformInterface, X4TerraformProjectWare } from '../../../redux/x4/terraform';

export function calculateRecommendedPathCost(
  terraform: X4TerraformInterface | null,
  extraProjects: string[],
  planet: string | undefined
) {
  let projectsWithCost: ProjectsWithCost[] = [];
  let planetTotals: PlanetTotals = {};
  let globalQuantity = 0;
  let globalPrice = 0;

  const rebates: { fromIndex: number; waregroup: string; value: number }[] = [];

  if (terraform && planet && terraform.planets[planet]) {
    extraProjects.forEach((extraProject) => {
      if (terraform.planets[planet].recommendedPath.indexOf(extraProject) !== -1) {
        const projectRebate = terraform.projects[extraProject].rebates;
        if (projectRebate)
          projectRebate.forEach((rebate) =>
            rebates.push({
              fromIndex: terraform.planets[planet].recommendedPath.indexOf(extraProject),
              waregroup: rebate.waregroup,
              value: parseInt(rebate.value),
            })
          );
      }
    });

    terraform.planets[planet].recommendedPath.forEach((project, projectIndex) => {
      let needsDiscount = false;
      let discountedResources: { [key: string]: X4TerraformProjectWare } | null = null;
      let rebatedWares: string[] = [];
      let projectQuantity: number = 0;
      let projectPrice: number = 0;

      console.log(terraform.projects[project]);

      terraform.projects[project].resources.wares.forEach((ware) => {
        rebates.forEach((rebate) => {
          if (ware.group === rebate.waregroup && projectIndex > rebate.fromIndex) needsDiscount = true;
        });

        if (!planetTotals[ware.ware])
          planetTotals[ware.ware] = {
            quantity: 0,
            discountedQuantity: 0,
            price: 0,
            discountedPrice: 0,
            volume: ware.volume,
          };

        planetTotals[ware.ware].quantity += ware.quantity;
        planetTotals[ware.ware].price += ware.totalCost;
        planetTotals[ware.ware].discountedQuantity += ware.quantity;
        planetTotals[ware.ware].discountedPrice += ware.totalCost;

        projectQuantity += ware.quantity * ware.volume;
        projectPrice += ware.totalCost;
        globalQuantity += ware.quantity * ware.volume;
        globalPrice += ware.totalCost;
      });

      if (needsDiscount) {
        discountedResources = {};
        terraform.projects[project].resources.wares.forEach((ware) =>
          rebates.forEach((rebate) => {
            if (ware.group === rebate.waregroup) {
              if (!discountedResources) discountedResources = {};
              rebatedWares.push(ware.ware);
              const discountedQuantity = ware.quantity * (1 - rebate.value / 100);
              const discountedPrice = ware.totalCost * (1 - rebate.value / 100);

              discountedResources[ware.ware] = {
                ...ware,
                quantity: discountedQuantity,
                totalCost: discountedPrice,
              };
              projectQuantity += discountedQuantity - ware.quantity;
              projectPrice += discountedPrice - ware.totalCost;

              planetTotals[ware.ware].discountedQuantity += discountedQuantity - ware.quantity;
              planetTotals[ware.ware].discountedPrice += discountedPrice - ware.totalCost;

              globalQuantity += discountedQuantity - ware.quantity;
              globalPrice += discountedPrice - ware.totalCost;
            }
          })
        );
      }

      projectsWithCost.push({
        id: terraform.projects[project].id,
        name: terraform.projects[project].name,
        description: terraform.projects[project].description,
        rebatedWares,
        resources: terraform.projects[project].resources,
        discountedResources,
        projectPrice,
        projectQuantity,
      });
    });
  }

  return {
    projectsWithCost,
    planetTotals,
    globalPrice,
    globalQuantity,
  };
}
