import { enemiesMap } from '../epic-arc-helpers';
import './EnemyProfile.scss';

const EnemyProfile = ({ enemy }: { enemy: string }) => {
  const EnemyProfileIcons = ({ damage, short = false }: { damage: string; short?: boolean }) => (
    <span className="ea-enemy-damage-profile__item">
      <img
        className="ea-enemy-damage-profile__icon"
        src={`/images/eve/icons-damage/${damage.toLowerCase()}.png`}
        title={damage}
        alt={damage}
      />
      {!short && <span className="small bold ea-enemy-damage-profile__damage">{damage.substring(0, 3)}</span>}
    </span>
  );

  return (
    <div className="ea-enemy-damage-profile">
      <h3 className="text--bold">{enemy}</h3>
      <ul className="ul--packed">
        <li className="ea-enemy-damage-profile__ident">
          <span className="ea-enemy-damage-profile__label">Tank against</span>
          {enemiesMap[enemy].incoming.map((damage) => (
            <EnemyProfileIcons damage={damage} key={damage} />
          ))}
        </li>
        <li className="ea-enemy-damage-profile__ident">
          <span className="ea-enemy-damage-profile__label">Use ammo for</span>
          {enemiesMap[enemy].outgoing.map((damage) => (
            <EnemyProfileIcons damage={damage} key={damage} />
          ))}
        </li>
      </ul>
    </div>
  );
};

export default EnemyProfile;
