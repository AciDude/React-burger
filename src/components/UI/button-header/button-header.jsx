import React from 'react'
import style from './button-header.module.css'
import PropTypes from 'prop-types'

export default function ButtonHeader({ children, isCurrent = false, onClick = () => null }) {
   const classes = ['pl-5', 'pr-5', 'pb-4', 'pt-4', 'text', 'text_type_main-default', style.button]
   isCurrent ? classes.push(style.active) : classes.push(style.inactive) && classes.push('text_color_inactive')
   return (
      <a
         className={classes.join(' ')}
         href='#'
         onClick={() => onClick()}
      >{children}</a>
   )
}

ButtonHeader.propTypes = {
   children: PropTypes.node.isRequired,
   isCurrent: PropTypes.bool,
   onClick: PropTypes.func
}