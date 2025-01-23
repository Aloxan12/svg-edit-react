import React from 'react'
import cls from './AttributesTools.module.scss'
import Input from './Input'

interface AttributesToolsProps {
  selectedElement: HTMLElement
  handleChange: (name: string, value: string) => void
  attributes: { [key: string]: string | string[] }
}

const AttributesTools: React.FC<AttributesToolsProps> = ({
  selectedElement,
  handleChange,
  attributes,
}) => {
  const round = (val: string | null) => {
    if (val === null || Number.isNaN(Number(val))) return val
    return Math.round((Number(val) + Number.EPSILON) * 1000) / 1000
  }

  const onChangeHandle = (name: string, value: string) => {
    console.log('result', name, value)
    selectedElement.setAttribute(name, value)
    handleChange(name, value)
  }

  return (
    <div className={cls.OIeAttributesTools}>
      <label key="tagName">
        Tag:
        <input type="text" name="tagName" disabled readOnly value={selectedElement.tagName ?? ''} />
      </label>
      <label key="id">
        Id:
        <Input
          type="text"
          name="id"
          defaultValue={selectedElement.id ?? ''}
          disabled
          handleChange={handleChange}
        />
      </label>
      {Object.entries(attributes).map(([attribute, type]) => {
        const value = round(selectedElement.getAttribute(attribute)) ?? ''
        if (Array.isArray(type)) {
          return (
            <label key={attribute}>
              {`${attribute}:`}
              <select
                defaultValue={value}
                onChange={(e) => handleChange(attribute, e.target.value)}
                name={attribute}
              >
                {type.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </label>
          )
        }
        if (type === 'text') {
          return (
            <label key={attribute}>
              {`${attribute}:`}
              <input
                type="text"
                name={attribute}
                onChange={(e) => handleChange(attribute, e.target.value)}
                defaultValue={value}
              />
            </label>
          )
        }
        if (type === 'number') {
          return (
            <label key={attribute}>
              {`${attribute}:`}
              <input
                type="number"
                name={attribute}
                onChange={(e) => handleChange(attribute, e.target.value)}
                defaultValue={value}
              />
            </label>
          )
        }
        return (
          <label key={attribute}>
            {`${attribute}:`}
            <input
              type="text"
              disabled={attribute.toLowerCase() === 'id'}
              name={attribute}
              onChange={(e) => onChangeHandle(attribute, e.target.value)}
              value={value}
            />
          </label>
        )
      })}
    </div>
  )
}

export default AttributesTools
