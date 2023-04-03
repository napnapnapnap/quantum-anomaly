import { EveEpicArcInfo } from '../../../redux/eve/epic-arcs';

const EpicArcsDetailGeneralNote = ({ epicArc }: { epicArc: EveEpicArcInfo }) => {
  return (
    <div className="ea-missions__content">
      <div className="ea-missions__item">
        <h3>General Notes</h3>
        <ul className="ul--packed">
          {epicArc.desc.map((desc) => (
            <li key={Math.random()}>{desc}</li>
          ))}
        </ul>
      </div>
      <div className="ea-missions__item">
        <h3>Things to be aware of</h3>
        <ul className="ul--packed">
          {epicArc.notes.map((note) => (
            <li key={Math.random()}>{note}</li>
          ))}
        </ul>
      </div>
      <div className="ea-missions__item">
        <h3>Rewards</h3>
        <ul className="ul--packed">
          {epicArc.rewards.map((reward) => (
            <li key={Math.random()}>{reward}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EpicArcsDetailGeneralNote;
