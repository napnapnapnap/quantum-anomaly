import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { fetchX4Terraform } from '../../../redux/x4Actions';
import { formatNumber } from '../x4-helpers';
import './Terraform.scss';

const Terraform = (props) => {
  const [projects, setProjects] = useState([]);
  const [projectsModified, setProjectsModified] = useState([]);
  const [totals, setTotals] = useState({ wares: [], price: 0 });
  const [totalsModified, setTotalsModified] = useState({ wares: [], price: 0 });

  const projectsGetsuFune = ['ter_tectonic_scaffolding', 'tmp_blackdust', 'bio_tailored'];

  // const projectsGetsuFune = [
  //   "atm_toxin_cleanup",
  //   "atm_toxin_cleanup",
  //   "atm_toxin_cleanup",
  //   "agr_fields_wheat",
  //   "bio_toxicfruit_genemod",
  //   "agr_vineyards",
  //   "ame_finedining",
  //   "res_arcology",
  //   "res_housing_dense",
  //   "res_housing_dense",
  //   "res_housing_dense",
  // ];

  useEffect(() => {
    if (!props.x4.terraform) props.fetchX4Terraform();
  }, [props.x4.terraform]);

  useEffect(() => {
    if (!props.x4.terraform) return;
    setProjectsModified([...projects, 'pwr_antimatter']);
  }, [projects]);

  useEffect(() => {
    if (!props.x4.terraform) return;
    const totals = { wares: [], price: 0 };
    projects.forEach((project) => {
      const currentProject = props.x4.terraform.projects[project];
      currentProject.resources.wares.forEach((ware) => {
        if (!totals.wares[ware.ware]) totals.wares[ware.ware] = { quantity: 0, cost: 0 };
        totals.wares[ware.ware].quantity += ware.quantity;
        totals.wares[ware.ware].cost += ware.totalCost;
        totals.price += ware.totalCost;
      });
    });
    setTotals(totals);

    setTimeout(() => console.log(totals), 1000);
  }, [projectsModified]);

  useEffect(() => {
    if (!props.x4.terraform) return;
    const totalsModified = { wares: [], price: 0, totalVolume: 0 };
    projectsModified.forEach((project) => {
      const currentProject = { ...props.x4.terraform.projects[project] };
      currentProject.resources.wares.forEach((ware) => {
        if (!totalsModified.wares[ware.ware]) totalsModified.wares[ware.ware] = { quantity: 0, cost: 0, volume: 0 };
        let quantity = ware.quantity;
        let totalCost = ware.totalCost;
        if (projectsModified.indexOf('pwr_antimatter') !== -1 && project !== 'pwr_antimatter') {
          if (ware.group === 'energy') {
            quantity = quantity * 0.5;
            totalCost = totalCost * 0.5;
          }
        }
        if (projectsModified.indexOf('ind_refineries_cheap') !== -1 && project !== 'ind_refineries_cheap') {
          if (ware.group === 'minerals' || ware.group === 'refined') {
            quantity = quantity * 0.9;
            totalCost = totalCost * 0.9;
          }
        }
        if (projectsModified.indexOf('ind_refineries_clean') !== -1 && project !== 'ind_refineries_clean') {
          if (ware.group === 'minerals' || ware.group === 'refined') {
            quantity = quantity * 0.9;
            totalCost = totalCost * 0.9;
          }
        }
        if (projectsModified.indexOf('ind_von_neumann') !== -1 && project !== 'ind_von_neumann') {
          if (ware.group === 'hightech' || ware.group === 'shiptech' || ware.group === 'weapontech') {
            quantity = quantity * 0.8;
            totalCost = totalCost * 0.8;
          }
        }
        if (projectsModified.indexOf('ind_factories') !== -1 && project !== 'ind_factories') {
          if (ware.group === 'hightech' || ware.group === 'shiptech' || ware.group === 'weapontech') {
            quantity = quantity * 0.9;
            totalCost = totalCost * 0.9;
          }
        }
        totalsModified.wares[ware.ware].quantity += quantity;
        totalsModified.wares[ware.ware].cost += totalCost;
        totalsModified.wares[ware.ware].volume += quantity * ware.volume;
        totalsModified.price += totalCost;
        totalsModified.totalVolume += quantity * ware.volume;
      });
    });
    setTotalsModified(totalsModified);

    setTimeout(() => console.log(totalsModified), 1000);
  }, [totals]);

  return (
    <div className="x4-terraform">
      <h1>X4 Terraform</h1>
      <h2 onClick={() => setProjects(projectsGetsuFune)}>Getsu Fune</h2>

      <p
        onClick={() => {
          if (projectsModified.indexOf('pwr_antimatter') !== -1) {
            const projects = [...projectsModified];
            projects.splice(projectsModified.indexOf('pwr_antimatter'), 1);
            setProjectsModified(projects);
          } else setProjectsModified([...projectsModified, 'pwr_antimatter']);
        }}
      >
        Anti/Matter
      </p>

      <p
        onClick={() => {
          if (projectsModified.indexOf('ind_refineries_clean') !== -1) {
            const projects = [...projectsModified];
            projects.splice(projectsModified.indexOf('ind_refineries_clean'), 1);
            setProjectsModified(projects);
          } else setProjectsModified([...projectsModified, 'ind_refineries_clean']);
        }}
      >
        Clean
      </p>

      <p
        onClick={() => {
          if (projectsModified.indexOf('ind_factories') !== -1) {
            const projects = [...projectsModified];
            projects.splice(projectsModified.indexOf('ind_factories'), 1);
            setProjectsModified(projects);
          } else setProjectsModified([...projectsModified, 'ind_factories']);
        }}
      >
        Factories
      </p>

      <p
        onClick={() => {
          if (projectsModified.indexOf('ind_von_neumann') !== -1) {
            const projects = [...projectsModified];
            projects.splice(projectsModified.indexOf('ind_von_neumann'), 1);
            setProjectsModified(projects);
          } else setProjectsModified([...projectsModified, 'ind_von_neumann']);
        }}
      >
        Von Nuemann
      </p>

      <div className="x4-terraform__projects">
        <div className="x4-terraform__project">
          {Object.keys(totals.wares).map((key) => (
            <React.Fragment key={key}>
              <p className="x4-terraform__wares">
                <span className="x4-terraform__wares-quantity">{formatNumber(totals.wares[key].quantity)}</span>
                <span className="x4-terraform__wares-name">{key}</span>
                <span className="x4-terraform__wares-cost">{formatNumber(totals.wares[key].cost)} CR</span>
              </p>
            </React.Fragment>
          ))}
          <hr />
          <span className="x4-terraform__wares-quantity"></span>
          <span className="x4-terraform__wares-name">Total Cost</span>
          <span className="x4-terraform__wares-cost">{formatNumber(totals.price)} CR</span>
        </div>

        <div className="x4-terraform__project">
          {Object.keys(totalsModified.wares).map((key) => (
            <React.Fragment key={key}>
              <p className="x4-terraform__wares">
                <span className="x4-terraform__wares-quantity">{formatNumber(totalsModified.wares[key].quantity)}</span>
                <span className="x4-terraform__wares-name">{key}</span>
                <span className="x4-terraform__wares-cost">{formatNumber(totalsModified.wares[key].cost)} CR</span>
                <span className="x4-terraform__wares-quantity">
                  {formatNumber(totalsModified.wares[key].volume)} m3
                </span>
              </p>
            </React.Fragment>
          ))}
          <hr />
          <span className="x4-terraform__wares-quantity"></span>
          <span className="x4-terraform__wares-name">Total Cost</span>
          <span className="x4-terraform__wares-cost">{formatNumber(totalsModified.price)} CR</span>
          <span className="x4-terraform__wares-cost">{formatNumber(totalsModified.totalVolume)} m3</span>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({ x4: state.x4 }),
  mapDispatchToProps = { fetchX4Terraform };

export default connect(mapStateToProps, mapDispatchToProps)(Terraform);
