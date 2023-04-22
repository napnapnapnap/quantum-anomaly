import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Checkbox from '../../../components/InputsOld/Checkbox';
import Select from '../../../components/InputsOld/Select';
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
import { calculateRecommendedPathCost } from './planet-helpers';

export interface ProjectsWithCost {
  id: string;
  name: string;
  description: string;
  rebatedWares: string[];
  resources: X4TerraformProjectInterface['resources'];
  discountedResources: { [key: string]: X4TerraformProjectWare } | null;
  projectPrice: number;
  projectQuantity: number;
}

export interface PlanetTotals {
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

  const [highestTotals, setHighestTotals] = useState<PlanetTotals>({});

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
    const recommendedPathCost = calculateRecommendedPathCost(terraform, extraProjects, planet);

    setProjectsWithCost(recommendedPathCost.projectsWithCost);
    setPlanetTotals(recommendedPathCost.planetTotals);
    setGlobalPrice(recommendedPathCost.globalPrice);
    setGlobalQuantity(recommendedPathCost.globalQuantity);
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

              <h3>Maximums needed</h3>
              <p>
                In case you want to start stockpiling resources ahead of time and have enough storage space, here is
                maximums that you might need to have in storage for any given project on any planets. Keep in mind that
                some of them might be repeatable. This list also doesn't take potential discounts into consideration.
              </p>

              {Object.keys(terraform.waresHighest)
                .sort()
                .map((wareKey) => (
                  <div className="x4-terraform__project-stats" key={wareKey}>
                    <span className="x4-terraform__ware-quantity text--right text--small">
                      {formatNumber(terraform.waresHighest[wareKey].quantity)}
                    </span>
                    <span className="x4-terraform__ware-name text--capitalize text--small">
                      × {separateWords(wareKey)}
                    </span>
                    <span className="x4-terraform__ware-volume text--right text--smaller">
                      {formatNumber(terraform.waresHighest[wareKey].quantity * terraform.waresHighest[wareKey].volume)}{' '}
                      m3
                    </span>
                    <span className="x4-terraform__ware-price text--right text--smaller text--muted">
                      Needed × {terraform.waresHighest[wareKey].projectCount}
                    </span>
                  </div>
                ))}
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
                        isDisabled={planet === 'ocean_of_fantasy'}
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
