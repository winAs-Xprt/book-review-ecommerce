import React from 'react'
import classes from './hero.module.css'

const Hero = () => {
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2 className={classes.title}>The Best Book Review Sites For Enthusiastic Readers</h2>
        <p className={classes.desc}>
        Trust Book Recommendations and Collaborative Review Platform from real people, not robots🤓
        </p>
        <div className={classes.inputContainer}>
          <input type="email"  placeholder="talkto.vaswin@gmail.com" />
          <button>Send</button>
        </div>
      </div>
    </div>
  )
}

export default Hero