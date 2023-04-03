import React, { useState } from 'react';

import Checkbox from '../Inputs/Checkbox';
import Input from '../Inputs/Input';
import Radio from '../Inputs/Radio';
import Select from '../Inputs/Select';

const Inputs = () => {
  const radioOptions = [
    { value: 'first', label: 'First Option', isDisabled: false },
    { value: 'second', label: 'Second Option', isDisabled: false },
    { value: 'third', label: 'Third Option', isDisabled: true },
  ];

  const [checkboxOne, setCheckboxOne] = useState(true);
  const [checkboxTwo, setCheckboxTwo] = useState(false);
  const handleCheckboxOneChange = (event: React.ChangeEvent<HTMLInputElement>) => setCheckboxOne(event.target.checked);
  const handleCheckboxTwoChange = (event: React.ChangeEvent<HTMLInputElement>) => setCheckboxTwo(event.target.checked);

  const [radioOne, setRadioOne] = useState('');
  const [radioTwo, setRadioTwo] = useState('second');
  const handleRadioOneChange = (event: React.ChangeEvent<HTMLInputElement>) => setRadioOne(event.target.value);
  const handleRadioTwoChange = (event: React.ChangeEvent<HTMLInputElement>) => setRadioTwo(event.target.value);

  const [selectOne, setSelectOne] = useState('');
  const [selectTwo, setSelectTwo] = useState('second');
  const handleSelectOneChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setSelectOne(event.target.value);
  const handleSelectTwoChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setSelectTwo(event.target.value);

  const [inputOne, setInputOne] = useState('');
  const [inputTwo, setInputTwo] = useState('Random');
  const handleInputOneChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setInputOne(event.target.value);
  const handleInputTwoChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setInputTwo(event.target.value);

  return (
    <>
      <h1>Styleguide Inputs</h1>
      <section className="styleguide__section styleguide__section--small">
        <Input
          label="Regular input"
          type="text"
          value={inputOne}
          name="inputOne"
          handleInputChange={handleInputOneChange}
        />
        <br />
        <br />
        <Input
          label="Regular input"
          type="text"
          value={inputTwo}
          name="inputTwo"
          handleInputChange={handleInputTwoChange}
        />
      </section>
      <section className="styleguide__section styleguide__section--small">
        <Select
          label="Select one label"
          placeholder="Select one"
          value={selectOne}
          options={radioOptions}
          name="selectOne"
          handleInputChange={handleSelectOneChange}
        />
        <br />
        <br />
        <Select
          label="Select two label"
          placeholder="Select one"
          value={selectTwo}
          options={radioOptions}
          name="selectTwo"
          handleInputChange={handleSelectTwoChange}
        />
      </section>
      <section className="styleguide__section styleguide__section--small">
        <Checkbox label="One" name="checkbox" checked={checkboxOne} handleInputChange={handleCheckboxOneChange} />
        <Checkbox label="Two" name="checkbox" checked={checkboxTwo} handleInputChange={handleCheckboxTwoChange} />
        <br />
        <br />
        <Radio name="radioOne" value={radioOne} options={radioOptions} handleInputChange={handleRadioOneChange} />
        <Radio name="radioTwo" value={radioTwo} options={radioOptions} handleInputChange={handleRadioTwoChange} />
        <br />
      </section>
    </>
  );
};

export default Inputs;
