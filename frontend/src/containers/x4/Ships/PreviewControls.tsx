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
  displayDlcs,
  setDisplayDlcs,
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
  displayDlcs: { [key: string]: boolean };
  setDisplayDlcs: (arg: any) => void;
}) => (
  <div className="x4-ships__controls">
    <div className="x4-ships__control-section">
      <p className="text--bold">Applied Equipment</p>

      <Select
        value={activeEquipment.thruster}
        options={[
          { value: 'thruster_gen_SIZE_allround_01_mk1', label: 'All-round Mk.1 Thruster' },
          { value: 'thruster_gen_SIZE_allround_01_mk2', label: 'All-round Mk.2 Thruster' },
          { value: 'thruster_gen_SIZE_allround_01_mk3', label: 'All-round Mk.3 Thruster' },
          { value: 'thruster_gen_SIZE_combat_01_mk1', label: 'Combat Mk.1 Thruster' },
          { value: 'thruster_gen_SIZE_combat_01_mk2', label: 'Combat Mk.2 Thruster' },
          { value: 'thruster_gen_SIZE_combat_01_mk3', label: 'Combat Mk.3 Thruster' },
        ]}
        name="thrusters"
        label=""
        className="x4-ships__control x4-ships__control--mb"
        handleInputChange={(e) => setActiveEquipment({ ...activeEquipment, thruster: e.target.value })}
      />

      <Select
        value={activeEquipment.engineRace}
        options={[
          { value: 'arg', label: 'Argon Engines' },
          { value: 'par', label: 'Paranid Engines' },
          { value: 'spl', label: 'Split Engines' },
          { value: 'tel', label: 'Teladi Engines' },
          { value: 'ter', label: 'Terran Engines' },
          { value: 'native', label: 'Native Engines' },
        ]}
        name="engine-race"
        handleInputChange={(e) =>
          setActiveEquipment({
            ...activeEquipment,
            engineRace: e.target.value,
          })
        }
      />

      <Select
        value={activeEquipment.engine}
        options={[
          { value: 'engine_RACE_SIZE_allround_01_mk1', label: 'All-round Mk.1 Engines' },
          { value: 'engine_RACE_SIZE_allround_01_mk2', label: 'All-round Mk.2 Engines' },
          { value: 'engine_RACE_SIZE_allround_01_mk3', label: 'All-round Mk.3 Engines' },
          { value: 'engine_RACE_SIZE_travel_01_mk1', label: 'Travel Mk.1 Engines' },
          { value: 'engine_RACE_SIZE_travel_01_mk2', label: 'Travel Mk.2 Engines' },
          { value: 'engine_RACE_SIZE_travel_01_mk3', label: 'Travel Mk.3 Engines' },
          { value: 'engine_RACE_SIZE_combat_01_mk1', label: 'Combat Mk.1 Engines' },
          { value: 'engine_RACE_SIZE_combat_01_mk2', label: 'Combat Mk.2 Engines' },
          { value: 'engine_RACE_SIZE_combat_01_mk3', label: 'Combat Mk.3 Engines' },
          { value: 'engine_RACE_SIZE_combat_01_mk4', label: 'Combat Mk.4 Engines' },
        ]}
        name="engine-type"
        handleInputChange={(e) =>
          setActiveEquipment({
            ...activeEquipment,
            engine: e.target.value,
          })
        }
        className="x4-ships__control x4-ships__control--mb"
      />

      <Select
        value={activeEquipment.shieldRace}
        options={[
          { value: 'arg', label: 'Argon Shields' },
          { value: 'par', label: 'Paranid Shields' },
          { value: 'spl', label: 'Split Shields' },
          { value: 'tel', label: 'Teladi Shields' },
          { value: 'ter', label: 'Terran Shields' },
          { value: 'native', label: 'Native Shields' },
        ]}
        name="shield-race"
        handleInputChange={(e) => setActiveEquipment({ ...activeEquipment, shieldRace: e.target.value })}
      />

      <Select
        value={activeEquipment.shield}
        options={[
          { value: 'shield_RACE_SIZE_standard_01_mk1', label: 'Standard Mk.1 Shields' },
          { value: 'shield_RACE_SIZE_standard_01_mk2', label: 'Standard Mk.2 Shields' },
          { value: 'shield_RACE_SIZE_standard_01_mk3', label: 'Standard Mk.3 Shields' },
        ]}
        name="shield-type"
        handleInputChange={(e) =>
          setActiveEquipment({
            ...activeEquipment,
            shield: e.target.value,
          })
        }
        className="x4-ships__control x4-ships__control--mb"
      />

      <Select
        value={sort}
        options={[
          { value: 'name', label: 'Sort by name' },
          { value: 'shield', label: 'Sort by shield capacity' },
          { value: 'speed', label: 'Sort by speed' },
          { value: 'boostSpeed', label: 'Sort by speed boost' },
          { value: 'travelSpeed', label: 'Sort by speed travel' },
          { value: 'weapons', label: 'Sort by weapon hardpoints' },
          { value: 'turrets', label: 'Sort by turret hardpoints' },
          { value: 'missiles', label: 'Sort by missiles' },
          { value: 'drones', label: 'Sort by drones' },
          { value: 'crew', label: 'Sort by crew' },
          { value: 'storage', label: 'Sort by storage' },
        ]}
        name="sort"
        handleInputChange={(e) => setSort(e.target.value)}
      />
    </div>

    <div className="x4-ships__control-section">
      <p className="text--bold">Ship class</p>
      {Object.keys(maps.shipClass).map((shipClassKey) => (
        <Checkbox
          label={`${maps.shipClass[shipClassKey as keyof typeof displayClass].replace('extralarge', 'XL')} Ships`}
          name="shipClass"
          checked={displayClass[shipClassKey as keyof typeof displayClass]}
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
          key={displayVariationKey}
          handleInputChange={(e) =>
            setDisplayVariations({
              ...displayVariations,
              [displayVariationKey]: e.target.checked,
            })
          }
        />
      ))}
    </div>
    <div className="x4-ships__control-section x4-ships__control-section--types">
      <p className="text--bold">Types</p>
      <div>
        <Checkbox
          label="All Types"
          name="displayTypes"
          checked={Object.entries(displayTypes).filter((type) => !type[1]).length === 0}
          handleInputChange={(e) => {
            const isAllSelected = Object.entries(displayTypes).filter((type) => !type[1]).length === 0;
            setDisplayTypes(Object.fromEntries(Object.keys(displayTypes).map((key) => [key, !isAllSelected])));
          }}
        />
        {Object.keys(displayTypes)
          .sort()
          .map((displayTypeKey) => (
            <Checkbox
              label={separateWords(displayTypeKey)}
              name="displayTypes"
              checked={displayTypes[displayTypeKey]}
              key={displayTypeKey}
              handleInputChange={(e) =>
                setDisplayTypes({
                  ...displayTypes,
                  [displayTypeKey]: e.target.checked,
                })
              }
            />
          ))}
      </div>
    </div>
    <div className="x4-ships__control-section">
      <p className="text--bold">Factions</p>
      <Checkbox
        label="All races"
        name="displayRace"
        checked={Object.entries(displayRace).filter((race) => !race[1]).length === 0}
        handleInputChange={(e) => {
          const isAllSelected = Object.entries(displayRace).filter((race) => !race[1]).length === 0;
          setDisplayRace(Object.fromEntries(Object.keys(displayRace).map((key) => [key, !isAllSelected])));
        }}
      />
      {Object.keys(maps.reverseRace)
        .sort()
        .map((raceKey) => (
          <Checkbox
            label={maps.reverseRace[raceKey]}
            name="displayRace"
            checked={displayRace[raceKey]}
            key={raceKey}
            handleInputChange={(e) =>
              setDisplayRace({
                ...displayRace,
                [raceKey]: e.target.checked,
              })
            }
          />
        ))}
    </div>
    <div className="x4-ships__control-section">
      <p className="text--bold">DLCs</p>
      {Object.keys(maps.dlcs).map((dlcKey) => (
        <Checkbox
          label={maps.dlcs[dlcKey]}
          name="displayDlcs"
          checked={displayDlcs[dlcKey]}
          key={dlcKey}
          className="x4-ships__dlc-checkbox"
          handleInputChange={(e) =>
            setDisplayDlcs({
              ...displayDlcs,
              [dlcKey]: e.target.checked,
            })
          }
        />
      ))}
    </div>
  </div>
);

export default PreviewControls;
