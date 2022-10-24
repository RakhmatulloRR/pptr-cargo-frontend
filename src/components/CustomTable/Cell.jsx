/* eslint-disable no-unused-expressions */
import React, { useState, useRef } from 'react';
import { GridTable } from './styled';

const EditableCell = ({
  index,
  item,
  colDefs,
  scrollOut,
  clearActiveOnCell,
  collapsibleRow,
}) => {
  const {
    cellRenderer: CellRenderer,
    editable,
    onSave,
    cellStyle,
    field,
    maxwidth,
  } = colDefs;
  const [editCell, setEditCell] = useState(false);
  const cell = useRef(null);
  const [text, setText] = useState(item?.[field]);
  const [success, setSuccess] = useState(false);

  const save = (e) => {
    let success =
      onSave &&
      onSave({
        colDef: { ...colDefs },
        data: { ...item },
        value: e?.target?.value,
      });

    setSuccess(success);
    cell?.current?.focus();
    setEditCell(false);
  };

  const onEditCell = () => {
    setEditCell(editable && true);
    setText(item?.[field]);
  };

  const onBlur = (editable) => {
    if (editable) {
      if (!editCell) {
        cell?.current?.classList?.contains('active-cell') &&
          cell?.current?.classList?.remove('active-cell');
      }
      // else if (
      //   document.activeElement.tagName !== 'input' &&
      //   !document.activeElement.closest('.active-cell')
      // ) {
      //   // setEditCell(false);
      //   cell.current.classList.contains('active-cell') &&
      //     cell.current.classList.remove('active-cell');
      // }
      // cell.current.innerText = text;
    } else
      cell?.current?.classList?.contains('active-cell') &&
        cell?.current?.classList?.remove('active-cell');
  };

  const onClickCell = () => {
    clearActiveOnCell && clearActiveOnCell();
    cell?.current?.classList?.add('active-cell');
  };

  // table data td
  const onKeyDown = (e) => {
    // for copy to clipboard
    const key = e.which || e.keyCode;
    const ctrl = e.ctrlKey ? e.ctrlKey : key === 17 ? true : false;
    if (key === 67 && ctrl) {
      navigator.clipboard.writeText(cell?.current?.innerText)?.then(() => {
        cell?.current?.classList?.add('copied');
        const current = cell?.current;
        const timeout = setTimeout(() => {
          if (current?.classList?.contains('copied'))
            current?.classList?.remove('copied');
        }, 1000);

        return () => {
          return clearTimeout(timeout);
        };
      });
    }

    // for navigation cell
    switch (e?.code) {
      case 'Space':
        if (editable && !editCell) {
          e.preventDefault();
          onEditCell();
        }
        break;
      case 'Escape':
        e.preventDefault();
        if (editable && editCell) {
          setEditCell(false);
          cell?.current?.focus();
          !cell?.current?.classList?.contains('active-cell') &&
            cell?.current?.classList?.add('active-cell');
        }
        break;
      case 'NumpadEnter':
      case 'Enter':
        if (editable && editCell) {
          e.preventDefault();
          save(e);
          !cell?.current?.classList?.contains('active-cell') &&
            cell?.current?.classList?.add('active-cell');
        }
        break;
      case 'ArrowRight':
        if (!editCell) {
          e.preventDefault();
          if (cell?.current?.nextElementSibling) {
            cell?.current?.classList?.remove('active-cell');
            cell?.current?.nextElementSibling?.classList?.add('active-cell');
            cell?.current?.nextElementSibling?.focus();
          }
        }
        break;
      case 'ArrowLeft':
        if (!editCell) {
          e.preventDefault();
          if (cell?.current?.previousElementSibling) {
            cell?.current?.classList?.remove('active-cell');
            cell?.current?.previousElementSibling?.classList?.add(
              'active-cell'
            );
            cell?.current?.previousElementSibling?.focus();
          }
        }
        break;
      case 'ArrowUp':
      case 'ArrowDown':
        e.preventDefault();
        if (!editCell) {
          let currentRow = cell?.current?.closest(
            collapsibleRow ? '.new-table-collapse-panel' : '.new-table-row'
          );
          let curerntPosCell = cell?.current?.getAttribute('tabIndex');
          if (e?.code === 'ArrowUp') {
            if (currentRow?.previousElementSibling) {
              cell?.current?.classList?.remove('active-cell');
              const prevCell =
                currentRow?.previousElementSibling?.querySelector(
                  `.new-table-cell[tabIndex='${curerntPosCell}']`
                );
              prevCell?.focus();
              prevCell?.classList?.add('active-cell');
            } else {
              const currentCollapse = currentRow?.closest(
                '.new-table-collapse'
              );
              if (
                currentCollapse?.previousElementSibling &&
                currentCollapse?.previousElementSibling?.querySelector(
                  '.new-table-row'
                )
              ) {
                currentCollapse?.previousElementSibling?.classList?.contains(
                  'close-collapse'
                ) &&
                  currentCollapse?.previousElementSibling?.classList?.remove(
                    'close-collapse'
                  );
                cell?.current?.classList?.remove('active-cell');
                const prevRow =
                  currentCollapse?.previousElementSibling?.querySelector(
                    '.inner-collapse-data .new-table-row:last-of-type'
                  );
                const prevCell = prevRow?.querySelector(
                  `.new-table-cell[tabIndex='${curerntPosCell}']`
                );
                prevCell?.focus();
                prevCell?.classList?.add('active-cell');
              }
            }
          }
          if (e?.code === 'ArrowDown') {
            if (currentRow?.nextElementSibling) {
              cell?.current?.classList?.remove('active-cell');
              const nextCell = currentRow?.nextElementSibling?.querySelector(
                `.new-table-cell[tabIndex='${curerntPosCell}']`
              );
              nextCell?.focus();
              nextCell?.classList?.add('active-cell');
            } else {
              const currentCollapse = currentRow?.closest(
                '.new-table-collapse'
              );
              if (
                currentCollapse?.nextElementSibling &&
                currentCollapse?.nextElementSibling?.querySelector(
                  '.new-table-row'
                )
              ) {
                currentCollapse?.nextElementSibling?.classList.contains(
                  'close-collapse'
                ) &&
                  currentCollapse?.nextElementSibling?.classList.remove(
                    'close-collapse'
                  );
                cell?.current?.classList?.remove('active-cell');
                const nextRow =
                  currentCollapse?.nextElementSibling?.querySelector(
                    '.inner-collapse-data .new-table-row:first-of-type'
                  );
                const nextCell = nextRow?.querySelector(
                  `.new-table-cell[tabIndex='${curerntPosCell}']`
                );
                nextCell?.focus();
                nextCell?.classList?.add('active-cell');
              }
            }
          }
        }
        break;
      default:
        null;
    }
  };

  const onChangeInput = (e) => {
    const { value } = e?.target;
    setText(value);
  };
  const inputBlur = (e) => {
    e?.target?.closest('.new-table-cell')?.classList?.contains('active-cell') &&
      e?.target?.closest('.new-table-cell')?.classList?.remove('active-cell');
    setEditCell();
  };
  return (
    <GridTable.Td
      ref={cell}
      tabIndex={index}
      className={'new-table-cell'}
      maxwidth={maxwidth}
      // oncopied={copied}
      onClick={onClickCell}
      // contentEditable={editable && editCell}
      onKeyDown={(e) => onKeyDown(e)}
      onBlur={() => onBlur(editable)}
      onDoubleClick={onEditCell}
      style={cellStyle && cellStyle(item)}
    >
      {!editCell ? (
        CellRenderer ? (
          <CellRenderer
            scrollOut={scrollOut}
            data={item}
            success={success}
            changedValue={text}
          />
        ) : (
          item[field]
        )
      ) : (
        <input
          className='edit-cell-text'
          type='text'
          value={text || ''}
          onChange={onChangeInput}
          onBlur={inputBlur}
          autoFocus
        />
      )}
    </GridTable.Td>
  );
};

export default React.memo(EditableCell);
