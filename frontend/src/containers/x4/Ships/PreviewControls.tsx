import Checkbox from '../../../components/Inputs/Checkbox';
import Select from '../../../components/Inputs/Select';
import { X4ShipClassEnum } from '../../../redux/x4/fitting';
import { maps, separateWords } from '../x4-helpers';

const PreviewControls = ({
  displayClass,
  setDisplayClass,
  displayVariations,
  setDisplayVariations,
  displayRace,
  setDisplayRace,
  displayTypes,
  setDisplayTypes,
  sort,
  setSort,
  activeEquipment,
  setActiveEquipment,
}: {
  displayClass: { [key in X4ShipClassEnum]: boolean };
  setDisplayClass: (arg: any) => void;
  displayVariations: { [key: string]: boolean };
  setDisplayVariations: (arg: any) => void;
  displayRace: { [key: string]: boolean };
  setDisplayRace: (arg: any) => void;
  displayTypes: { [key: string]: boolean };
  setDisplayTypes: (arg: any) => void;
  sort: string;
  setSort: (arg: any) => void;
  activeEquipment: any;
  setActiveEquipment: (arg: any) => void;
}) => (
  <div className="x4-ships__controls">
    <p className="">Ship class and types</p>
    {Object.keys(maps.shipClass).map((shipClassKey) => (
      <Checkbox
        label={`${maps.shipClass[shipClassKey as keyof typeof displayClass].replace('extralarge', 'XL')} Ships`}
        name="shipClass"
        checked={displayClass[shipClassKey as keyof typeof displayClass]}
        isInline
        key={shipClassKey}
        handleInputChange={(e) =>
          setDisplayClass({
            ...displayClass,
            [shipClassKey]: e.target.checked,
          })
        }
      />
    ))}
    {Object.keys(maps.variations).map((displayVariationKey) => (
      <Checkbox
        label={maps.variations[displayVariationKey]}
        name="displayVariations"
        checked={displayVariations[displayVariationKey]}
        isInline
        key={displayVariationKey}
        handleInputChange={(e) =>
          setDisplayVariations({
            ...displayVariations,
            [displayVariationKey]: e.target.checked,
          })
        }
      />
    ))}

    <p className="mt-1">
      Faction{' '}
      <button
        onClick={() => {
          setDisplayRace(Object.fromEntries(Object.keys(displayRace).map((key) => [key, false])));
        }}
        className="input-control link link--secondary"
      >
        Uncheck all
      </button>
    </p>
    {Object.keys(maps.reverseRace).map((raceKey) => (
      <Checkbox
        label={maps.reverseRace[raceKey]}
        name="displayRace"
        checked={displayRace[raceKey]}
        isInline
        key={raceKey}
        handleInputChange={(e) =>
          setDisplayRace({
            ...displayRace,
            [raceKey]: e.target.checked,
          })
        }
      />
    ))}

    <p className="mt-1">
      Types
      <button
        onClick={() => {
          setDisplayTypes(Object.fromEntries(Object.keys(displayTypes).map((key) => [key, false])));
        }}
        className="input-control link link--secondary"
      >
        Uncheck all
      </button>
    </p>
    {Object.keys(displayTypes).map((displayTypeKey) => (
      <Checkbox
        label={separateWords(displayTypeKey)}
        name="displayTypes"
        checked={displayTypes[displayTypeKey]}
        isInline
        key={displayTypeKey}
        handleInputChange={(e) =>
          setDisplayTypes({
            ...displayTypes,
            [displayTypeKey]: e.target.checked,
          })
        }
      />
    ))}

    <br />
    <Select
      value={sort}
      options={[
        { value: 'name', label: 'Name' },
        { value: 'shield', label: 'Shield Capacity' },
        { value: 'speed', label: 'Speed' },
        { value: 'boostSpeed', label: 'Speed Boost' },
        { value: 'travelSpeed', label: 'Speed Travel' },
        { value: 'weapons', label: 'Weapon hardpoints' },
        { value: 'turrets', label: 'Turret hardpoints' },
        { value: 'missiles', label: 'Missiles' },
        { value: 'drones', label: 'Drones' },
        { value: 'crew', label: 'Crew' },
        { value: 'storage', label: 'Storage' },
      ]}
      name="sort"
      label="Sort by"
      handleInputChange={(e) => setSort(e.target.value)}
    />

    <Select
      value={activeEquipment.thruster}
      options={[
        { value: 'thruster_gen_SIZE_allround_01_mk1', label: 'All-round Mk.1' },
        { value: 'thruster_gen_SIZE_allround_01_mk2', label: 'All-round Mk.2' },
        { value: 'thruster_gen_SIZE_allround_01_mk3', label: 'All-round Mk.3' },
        { value: 'thruster_gen_SIZE_combat_01_mk1', label: 'Combat Mk.1' },
        { value: 'thruster_gen_SIZE_combat_01_mk2', label: 'Combat Mk.2' },
        { value: 'thruster_gen_SIZE_combat_01_mk3', label: 'Combat Mk.3' },
      ]}
      name="thrusters"
      label="Thrusters"
      handleInputChange={(e) => setActiveEquipment({ ...activeEquipment, thruster: e.target.value })}
    />

    <Select
      value={activeEquipment.engine}
      options={[
        { value: 'engine_RACE_SIZE_allround_01_mk1', label: 'All-round Mk.1' },
        { value: 'engine_RACE_SIZE_allround_01_mk2', label: 'All-round Mk.2' },
        { value: 'engine_RACE_SIZE_allround_01_mk3', label: 'All-round Mk.3' },
        { value: 'engine_RACE_SIZE_travel_01_mk1', label: 'Travel Mk.1' },
        { value: 'engine_RACE_SIZE_travel_01_mk2', label: 'Travel Mk.2' },
        { value: 'engine_RACE_SIZE_travel_01_mk3', label: 'Travel Mk.3' },
        { value: 'engine_RACE_SIZE_combat_01_mk1', label: 'Combat Mk.1' },
        { value: 'engine_RACE_SIZE_combat_01_mk2', label: 'Combat Mk.2' },
        { value: 'engine_RACE_SIZE_combat_01_mk3', label: 'Combat Mk.3' },
        { value: 'engine_RACE_SIZE_combat_01_mk4', label: 'Combat Mk.4' },
      ]}
      name="engine-type"
      label="Engine type"
      handleInputChange={(e) =>
        setActiveEquipment({
          ...activeEquipment,
          engineRace: e.target.value === 'engine_RACE_SIZE_combat_01_mk4' ? 'spl' : activeEquipment.engineRace,
          engine: e.target.value,
        })
      }
    />

    <Select
      value={activeEquipment.engineRace}
      options={[
        { value: 'arg', label: 'Argon' },
        { value: 'par', label: 'Paranid' },
        { value: 'spl', label: 'Split' },
        { value: 'tel', label: 'Teladi' },
        { value: 'ter', label: 'Terran' },
      ]}
      name="engine-race"
      label="Engine race"
      handleInputChange={(e) =>
        setActiveEquipment({
          ...activeEquipment,
          engineRace: e.target.value,
          engine: e.target.value !== 'spl' ? activeEquipment.engine.replace('mk4', 'mk3') : activeEquipment.engine,
        })
      }
    />

    <Select
      value={activeEquipment.shield}
      options={[
        { value: 'shield_RACE_SIZE_standard_01_mk1', label: 'Standard Mk.1' },
        { value: 'shield_RACE_SIZE_standard_01_mk2', label: 'Standard Mk.2' },
        { value: 'shield_RACE_SIZE_standard_01_mk3', label: 'Standard Mk.3' },
      ]}
      name="shield-type"
      label="Shield type"
      handleInputChange={(e) =>
        setActiveEquipment({
          ...activeEquipment,
          shield: e.target.value,
        })
      }
    />

    <Select
      value={activeEquipment.shieldRace}
      options={[
        { value: 'arg', label: 'Argon' },
        { value: 'par', label: 'Paranid' },
        { value: 'spl', label: 'Split' },
        { value: 'tel', label: 'Teladi' },
        { value: 'ter', label: 'Terran' },
      ]}
      name="shield-race"
      label="Shield race"
      handleInputChange={(e) => setActiveEquipment({ ...activeEquipment, shieldRace: e.target.value })}
    />

    <p className="text--small text--muted text--long">
      If selected is not available for a given ship, it will use the next best thing. For example, Mk.4 engines are only
      available to Split in small and medium size. Selecting these engines will equip split Mk.1 versions on large
      ships. Combat engines do not exist on capitals, they will be translated into all-round engines. Under each ship
      there is list of actually equipped modules.
    </p>
  </div>
);

export default PreviewControls;
