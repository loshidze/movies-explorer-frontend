import React from 'react';

function FilterCheckbox() {
  return (
    <label class="toggle">
      <input class="toggle-checkbox" type="checkbox"/>
      <div class="toggle-switch"></div>
      <span class="toggle-label">Короткометражки</span>
    </label>
  )
}

export default FilterCheckbox;
