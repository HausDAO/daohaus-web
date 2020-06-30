import React, { useContext } from 'react';
import { ToggleLayer, anchor } from 'react-laag';

import { ExploreContext } from '../../contexts/ExploreContext';

import './Explore.scss';

const FilterList = ({ name, options, filterKey }) => {
  const { state, dispatch } = useContext(ExploreContext);

  const renderOptions = () => {
    return options.map(option => {
      const isSelected = state.filters[filterKey].includes(option.value);

      return (
        <div
          key={option.value}
          className={isSelected ? 'selected' : ''}
          onClick={() => handleChange(option, isSelected)}
        >
          {option.label}
          {isSelected ? <span>**</span> : null}
        </div>
      );
    });
  };

  const handleChange = (option, isSelected) => {
    let updatedFilterValues;
    if (isSelected) {
      updatedFilterValues = state.filters[filterKey].filter(
        f => f !== option.value,
      );
    } else {
      updatedFilterValues = [...state.filters[filterKey], option.value];
    }

    dispatch({
      type: 'updateFilter',
      payload: { [filterKey]: updatedFilterValues },
    });
  };

  return (
    <div className="FilterList">
      <ToggleLayer
        placement={{ anchor: anchor.BOTTOM_LEFT }}
        closeOnOutsideClick={true}
        renderLayer={({ layerProps, isOpen }) =>
          isOpen && (
            <div
              ref={layerProps.ref}
              style={{
                ...layerProps.style,
                backgroundColor: 'white',
                padding: '20px',
              }}
            >
              {renderOptions()}
            </div>
          )
        }
      >
        {({ toggle, triggerRef }) => (
          <div
            ref={triggerRef}
            onClick={toggle}
            style={{ margin: '10px 10px 20px 20px' }}
          >
            {name}
          </div>
        )}
      </ToggleLayer>
    </div>
  );
};

export default FilterList;
