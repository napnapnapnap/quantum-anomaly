import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Checkbox from '../../../components/Inputs/Checkbox';
import Select from '../../../components/Inputs/Select';
import { seo } from '../../../helpers';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import LayoutBase from '../../../layouts/Base';
import {
  X4TerraformPlanetInterface,
  X4TerraformProjectInterface,
  X4TerraformProjectWare,
  getX4Terraform,
  moveProjectInPlanet,
  toggleProjectInPlanet,
} from '../../../redux/x4/terraform';
import { formatDecimal, formatNumber, separateWords } from '../x4-helpers';
import './Terraform.scss';
import initialSeo from './initialSeo.json';

interface ProjectsWithCost {
  id: string;
  name: string;
  description: string;
  rebatedWares: string[];
  resources: X4TerraformProjectInterface['resources'];
  discountedResources: { [key: string]: X4TerraformProjectWare } | null;
  projectPrice: number;
  projectQuantity: number;
}

interface PlanetTotals {
  [key: string]: {
    quantity: number;
    discountedQuantity: number;
    price: number;
    discountedPrice: number;
    volume: number;
  };
}

const Terraform = () => {
  const dispatch = useAppDispatch();
  const { planet } = useParams<{ planet?: string }>();
  const navigate = useNavigate();

  const { terraform } = useAppSelector((state) => state.x4Terraform);

  const [activePlanet, setActivePlanet] = useState<X4TerraformPlanetInterface | null>();
  const [planetSelector, setPlanetSelector] = useState<{ value: string; label: string }[] | null>();
  const [planetTotals, setPlanetTotals] = useState<PlanetTotals>({});
  const [globalQuantity, setGlobalQuantity] = useState(0);
  const [globalPrice, setGlobalPrice] = useState(0);

  const getStat = (arg: string) => {
    if (terraform) return terraform.stats.filter((stat) => stat.id === arg)[0];
    else return { id: '', name: '', default: '', icon: '', inactivetext: 'string', range: [] };
  };

  const extraProjects = ['pwr_antimatter', 'ind_refineries_clean', 'ind_factories', 'ind_von_neumann'];
  const [projectsWithCost, setProjectsWithCost] = useState<ProjectsWithCost[]>([]);

  useEffect(() => {
    if (!terraform) dispatch(getX4Terraform());
    else {
      seo(initialSeo);
      setPlanetSelector(
        Object.keys(terraform.planets).map((key: string) => ({
          value: key,
          label: `${terraform.planets[key].system} - ${terraform.planets[key].name}`,
        }))
      );
      if (planet && terraform.planets[planet]) setActivePlanet(terraform.planets[planet]);
    }
  }, [dispatch, terraform]);

  useEffect(() => {
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

      rebates.sort((a, b) => a.fromIndex - b.fromIndex);

      terraform.planets[planet].recommendedPath.forEach((project, projectIndex) => {
        let needsDiscount = false;
        let discountedResources: { [key: string]: X4TerraformProjectWare } | null = null;
        let rebatedWares: string[] = [];
        let projectQuantity: number = 0;
        let projectPrice: number = 0;

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

    setProjectsWithCost(projectsWithCost);
    setPlanetTotals(planetTotals);
    setGlobalPrice(globalPrice);
    setGlobalQuantity(globalQuantity);
  }, [terraform, planet]);

  return (
    <LayoutBase title="X4 Terraform">
      {terraform && planetSelector ? (
        <div className="x4-terraform">
          <Select
            value={planet || ''}
            options={planetSelector}
            name="activePlanet"
            placeholder="Choose a project"
            handleInputChange={(e) => {
              setActivePlanet(terraform.planets[e.target.value]);
              navigate(`/x4/terraform/${e.target.value}`);
            }}
          />

          {!planet && (
            <div className="text--long">
              <h2>General information</h2>
              <p>
                Terraforming is a late game activity for completionists. Mostly it doesn't matter in terms of rewards,
                however Scale Plate Green one is nice to do since it offers a lot of exceptional mods.
              </p>
              <p>
                Overall it would be recommended to build up production on PHQ since it will be moving all over the
                universe and your logistics lines will otherwise break. It would be smart to disallow other races to buy
                ships from PHQ in order to conserve your resources for the actual terraforming.
              </p>
              <p>Choose a project and have fun!</p>
            </div>
          )}

          {planet && activePlanet && (
            <>
              <h2>
                {activePlanet.system} - {activePlanet.name}
              </h2>
              <p className="text--long">{activePlanet.notes}</p>
              <br />
              <div className="x4-terraform__header">
                <div className="x4-terraform__stats">
                  <div className="x4-terraform__stat">
                    <p className="text--bold">Planet statistics</p>
                    <ul className="ul--packed">
                      {Object.keys(activePlanet.stats).map(
                        (key) =>
                          activePlanet.stats[key] !== 0 && (
                            <li key={key}>
                              {getStat(key).name} levels: {activePlanet.stats[key]}
                            </li>
                          )
                      )}
                    </ul>
                  </div>
                  <div className="x4-terraform__stat">
                    <p className="text--bold">Objectives</p>
                    <ul className="ul--packed">
                      <li>{formatNumber(activePlanet.objectives.population)} population</li>
                      {activePlanet.objectives.projects.map((project) => (
                        <li key={project}>
                          {terraform.projects[project] ? terraform.projects[project].name : project}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="x4-terraform__stat">
                    <p className="text--bold">Rewards</p>
                    <ul className="ul--packed">
                      {activePlanet.rewards.map((reward) => (
                        <li key={reward}>{reward}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="x4-terraform__checkboxes">
                  <p className="text--bold">Extra projects</p>
                  {extraProjects.map((project) => (
                    <div key={project}>
                      <Checkbox
                        label={terraform.projects[project].name}
                        name={project}
                        checked={activePlanet.recommendedPath.indexOf(project) !== -1}
                        handleInputChange={() => dispatch(toggleProjectInPlanet({ planet, project }))}
                      />
                    </div>
                  ))}
                  <br />
                  <p className="text--muted text--long">
                    These can give discounts on certain items when used, however, keep in mind that they are not always
                    the best solution for most planets. It is likely that total price will go up, but you might be able
                    to justify that cost increase with decrease of storage requirements or to alleviate logistics strain
                    on some selected wares. Keep in mind, order of these do matter, you are free to move them up and
                    down the chain below. When they make sense, they will be auto suggested in the correct place.
                  </p>
                </div>
              </div>

              <div className="x4-terraform__body">
                <div className="x4-terraform__projects">
                  {projectsWithCost.map((project, index) => (
                    <div key={`${project}-${index}`}>
                      <div className="x4-terraform__project-name">
                        <p className="text--bold">
                          {index + 1}. {project.name}
                        </p>
                        {extraProjects.indexOf(project.id) !== -1 && (
                          <div>
                            {index !== 0 && (
                              <span
                                className="link link--secondary text--smaller text--bold"
                                onClick={() =>
                                  dispatch(moveProjectInPlanet({ planet, project: project.id, direction: 'up' }))
                                }
                              >
                                Move UP
                              </span>
                            )}
                            <span
                              className="link link--secondary text--smaller text--bold"
                              onClick={() =>
                                dispatch(moveProjectInPlanet({ planet, project: project.id, direction: 'down' }))
                              }
                            >
                              Move Down
                            </span>
                          </div>
                        )}
                      </div>
                      <p className="x4-terraform__description text--smaller">{project.description}</p>
                      <div className="x4-terraform__project-inner">
                        {project.resources.wares.map((resource) => (
                          <React.Fragment key={resource.ware}>
                            <div
                              className={clsx('x4-terraform__project-stats', {
                                'x4-terraform__project-stats--discounted':
                                  project.rebatedWares.indexOf(resource.ware) !== -1,
                              })}
                              key={resource.ware}
                            >
                              <span className="x4-terraform__ware-quantity text--right text--small">
                                {formatNumber(resource.quantity)}
                              </span>
                              <span className="x4-terraform__ware-name text--capitalize text--small">
                                {project.rebatedWares.indexOf(resource.ware) === -1 &&
                                  ` × ${separateWords(resource.ware)}`}
                              </span>
                              <span className="x4-terraform__ware-volume text--right text--smaller">
                                {formatNumber(resource.quantity * resource.volume)} m3
                              </span>
                              <span className="x4-terraform__ware-price text--right text--muted text--smaller">
                                ~{formatDecimal(resource.totalCost)} CR
                              </span>
                            </div>
                            {project.rebatedWares.indexOf(resource.ware) !== -1 && project.discountedResources && (
                              <React.Fragment>
                                <div
                                  className="x4-terraform__project-stats x4-terraform__project-stats--discount"
                                  key={resource.ware}
                                >
                                  <span className="x4-terraform__ware-quantity text--right text--small">
                                    {formatNumber(project.discountedResources[resource.ware].quantity)}
                                  </span>
                                  <span className="x4-terraform__ware-name text--capitalize text--small">
                                    × {separateWords(project.discountedResources[resource.ware].ware)}
                                  </span>
                                  <span className="x4-terraform__ware-volume text--right text--smaller">
                                    {formatNumber(
                                      project.discountedResources[resource.ware].quantity *
                                        project.discountedResources[resource.ware].volume
                                    )}{' '}
                                    m3
                                  </span>
                                  <span className="x4-terraform__ware-price text--right text--muted text--smaller">
                                    ~{formatDecimal(project.discountedResources[resource.ware].totalCost)} CR
                                  </span>
                                </div>{' '}
                              </React.Fragment>
                            )}
                          </React.Fragment>
                        ))}
                        <div className="x4-terraform__project-stats">
                          <span className="x4-terraform__ware-quantity text--small"></span>
                          <span className="x4-terraform__ware-name text--right text--small"></span>
                          <span className="x4-terraform__ware-volume text--right text--smaller text--bold">
                            {formatNumber(project.projectQuantity)} m3
                          </span>
                          <span className="x4-terraform__ware-price text--right text--muted text--smaller text--bold">
                            ~{formatDecimal(project.projectPrice)} CR
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="x4-terraform__totals">
                  <p className="text--bold">Totals for all projects</p>
                  {Object.keys(planetTotals)
                    .sort()
                    .map((ware) => (
                      <div key={ware}>
                        <div
                          className={clsx('x4-terraform__project-stats', {
                            'x4-terraform__project-stats--discounted':
                              planetTotals[ware].quantity !== planetTotals[ware].discountedQuantity,
                          })}
                        >
                          <span className="x4-terraform__ware-quantity text--right text--small">
                            {formatNumber(planetTotals[ware].quantity)}
                          </span>
                          <span className="x4-terraform__ware-name text--capitalize text--small">
                            {planetTotals[ware].quantity === planetTotals[ware].discountedQuantity &&
                              ` × ${separateWords(separateWords(ware))}`}
                          </span>
                          <span className="x4-terraform__ware-volume text--right text--smaller">
                            {formatNumber(planetTotals[ware].quantity * planetTotals[ware].volume)} m3
                          </span>
                          <span className="x4-terraform__ware-price text--right text--muted text--smaller">
                            ~{formatDecimal(planetTotals[ware].price)} CR
                          </span>
                        </div>
                        {planetTotals[ware].quantity !== planetTotals[ware].discountedQuantity && (
                          <div className="x4-terraform__project-stats x4-terraform__project-stats--discount">
                            <span className="x4-terraform__ware-quantity text--right text--small">
                              {formatNumber(planetTotals[ware].discountedQuantity)}
                            </span>
                            <span className="x4-terraform__ware-name text--capitalize text--small">
                              × {separateWords(separateWords(ware))}
                            </span>
                            <span className="x4-terraform__ware-volume text--right text--smaller">
                              {formatNumber(planetTotals[ware].discountedQuantity * planetTotals[ware].volume)} m3
                            </span>
                            <span className="x4-terraform__ware-price text--right text--muted text--smaller">
                              ~{formatDecimal(planetTotals[ware].discountedPrice)} CR
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  <div className="x4-terraform__project-stats">
                    <span className="x4-terraform__ware-quantity text--right text--small"></span>
                    <span className="x4-terraform__ware-name text--capitalize text--small"></span>
                    <span className="x4-terraform__ware-volume text--right text--bold text--smaller">
                      {formatNumber(globalQuantity)} m3
                    </span>
                    <span className="x4-terraform__ware-price text--right text--bold text--smaller">
                      ~{formatDecimal(globalPrice)} CR
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <></>
      )}
    </LayoutBase>
  );
};

export default Terraform;
