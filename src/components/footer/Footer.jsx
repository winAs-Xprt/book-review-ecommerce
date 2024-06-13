import React from "react"
import classes from "./footer.module.css"
import { AiFillInstagram, AiFillFacebook, AiFillTwitterCircle, AiFillGithub } from "react-icons/ai"

const Footer = () => {
  return (
    <footer id="faq" className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.col}>
          <h2 className={classes.title}>Working days</h2>
          <ul className={classes.list}>
            <li>Monday - Friday</li>
            <li className={classes.workingTime}>08:00 - 22:00</li>
            <li>&copy; CopyRights</li>
            <li className={classes.workingTime}>Designed With ❤️ By Aswin</li>
          </ul>
        </div>
        <div className={classes.col}>
          <h2 className={classes.title}>Newsletter</h2>
          <ul className={classes.list}>
            <li>Subscribe to our newsletter</li>
            <li>and receive the latest books,</li>
            <li>along with weekly menus </li>
            <li>featuring limited edition novels.</li>
            <li>Thank you for visiting!</li>
          </ul>
        </div>
        <div className={classes.col}>
          <h2 className={classes.title}>Social Media</h2>
          <ul className={classes.iconList}>
          <li>
            <a href="https://github.com/winAs-Xprt">
            <AiFillGithub />
            </a>
          </li>
            <li><AiFillInstagram /></li>
            <li><AiFillFacebook /></li>
            <li><AiFillTwitterCircle /></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer