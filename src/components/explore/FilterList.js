import React, { useContext } from 'react';
import { ToggleLayer, anchor } from 'react-laag';
import { CheckCircleOutlined } from '@ant-design/icons';

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
          {isSelected ? (
            <CheckCircleOutlined style={{ float: 'right' }} />
          ) : null}
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
              className="DropdownList"
              style={{
                ...layerProps.style,
              }}
            >
              {renderOptions()}
            </div>
          )
        }
      >
        {({ toggle, triggerRef }) => (
          <div className="Trigger" ref={triggerRef} onClick={toggle}>
            {name}
          </div>
        )}
      </ToggleLayer>
    </div>
  );
};

export default FilterList;
