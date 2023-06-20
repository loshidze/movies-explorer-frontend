import React from 'react';

function FilterCheckbox() {
  return (
    <label class="toggle">
      <input class="toggle__checkbox" type="checkbox"/>
      <span class="toggle__switch"></span>
      <span class="toggle__label">Короткометражки</span>
    </label>
  )
}

export default FilterCheckbox;
