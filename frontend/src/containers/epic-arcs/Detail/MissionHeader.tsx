import { EveEpicArcInfo } from '../../../redux/eve/epic-arcs';
import EnemyProfile from './EnemyProfile';

const EpicArcsDetailMissionHeader = ({
  epicArc,
  activeMissionIndex,
}: {
  epicArc: EveEpicArcInfo;
  activeMissionIndex: number;
}) => {
  let enemies: string[] = [];

  if (Array.isArray(epicArc.missions![activeMissionIndex].enemy)) {
    enemies = epicArc.missions![activeMissionIndex].enemy as string[];
  } else if (epicArc.missions![activeMissionIndex].enemy)
    enemies.push(epicArc.missions![activeMissionIndex].enemy as string);

  return (
    <>
      <h2>{epicArc.missions![activeMissionIndex].name}</h2>
      <div className="ea-missions__item">
        <h3>What do you need to do</h3>
        <ul className="ul--packed">
          {epicArc.missions![activeMissionIndex].desc.map((desc) => (
            <li key={Math.random()}>{desc}</li>
          ))}
        </ul>
      </div>

      <div className="ea-missions__item">
        <h3>Agent details</h3>
        <ul className="ul--packed">
          <li className="text--bold">{epicArc.missions![activeMissionIndex].type} mission type</li>
          <li>
            Given by <span className="text--bold">{epicArc.missions![activeMissionIndex].agent}</span> at{' '}
            {epicArc.missions![activeMissionIndex].source}
          </li>
          <li>
            Starts in <span className="text--bold">{epicArc.missions![activeMissionIndex].start}</span> and goes to{' '}
            {epicArc.missions![activeMissionIndex].dest}
          </li>
        </ul>
      </div>

      <div className="ea-missions__item">
        <h3>Tips and objective</h3>
        <ul className="ul--packed">
          {epicArc.missions![activeMissionIndex].canAcptRmty && <li>Mission can be accepted remotely</li>}
          {epicArc.missions![activeMissionIndex].tips.map(
            (tip) => tip.length > 0 && <li key={Math.random()}>{tip}</li>
          )}
          <li>{epicArc.missions![activeMissionIndex].objective}</li>
        </ul>
      </div>

      <div className="ea-missions__item">
        {enemies.map((enemy) => (
          <EnemyProfile enemy={enemy} key={enemy} />
        ))}
      </div>
    </>
  );
};

export default EpicArcsDetailMissionHeader;
