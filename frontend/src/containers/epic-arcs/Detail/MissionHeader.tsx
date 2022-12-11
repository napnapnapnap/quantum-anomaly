import { EveEpicArcInfo } from '../../../redux/eve/epic-arcs';
import { enemiesMap } from '../epic-arc-helpers';

const EnemyProfileIcons = ({ damage, short = false }: { damage: string; short?: boolean }) => (
  <span className="enemy-damage-profile__item">
    <img
      className="enemy-damage-profile__icon"
      src={`/images/eve/icons-damage/${damage.toLowerCase()}.png`}
      title={damage}
      alt={damage}
    />
    {!short && <span className="small bold enemy-damage-profile__damage">{damage.substring(0, 3)}</span>}
  </span>
);

const EnemyProfile = ({ enemy }: { enemy: string }) => {
  return (
    <div className="enemy-damage-profile">
      <h3 className="text--bold">{enemy}</h3>
      <ul className="ul--packed">
        <li className="enemy-damage-profile__ident">
          <span className="enemy-damage-profile__label">Tank against</span>
          {enemiesMap[enemy].incoming.map((damage) => (
            <EnemyProfileIcons damage={damage} key={damage} />
          ))}
        </li>
        <li className="enemy-damage-profile__ident">
          <span className="enemy-damage-profile__label">Use ammo for</span>
          {enemiesMap[enemy].outgoing.map((damage) => (
            <EnemyProfileIcons damage={damage} key={damage} />
          ))}
        </li>
      </ul>
    </div>
  );
};

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
      <div className="missions__item">
        <h3>What do you need to do</h3>
        <ul className="ul--packed">
          {epicArc.missions![activeMissionIndex].desc.map((desc) => (
            <li key={Math.random()}>{desc}</li>
          ))}
        </ul>
      </div>

      <div className="missions__item">
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

      <div className="missions__item">
        <h3>Tips and objective</h3>
        <ul className="ul--packed">
          {epicArc.missions![activeMissionIndex].canAcptRmty && <li>Mission can be accepted remotely</li>}
          {epicArc.missions![activeMissionIndex].tips.map(
            (tip) => tip.length > 0 && <li key={Math.random()}>{tip}</li>
          )}
          <li>{epicArc.missions![activeMissionIndex].objective}</li>
        </ul>
      </div>

      <div className="missions__item">
        {enemies.map((enemy) => (
          <EnemyProfile enemy={enemy} key={enemy} />
        ))}
      </div>
    </>
  );
};

export default EpicArcsDetailMissionHeader;
