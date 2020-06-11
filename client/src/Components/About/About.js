import React from "react";
import classes from "./About.module.css";
import { FaUserCog } from "react-icons/fa";
import BoxLayout from "../UI/BoxLayout/BoxLayout";

const About = () => {
  return (
    <BoxLayout>
      <div className={classes.About}>
        <h2>ABOUT</h2>
        <div className={classes.AboutBody}>
          The purpose of this app is to make the process of circulating events
          and concerns in a structured way. <br />
          This app allows user to share the details of any <span>
            Buzz
          </span>{" "}
          that is going around the Organization or can share their{" "}
          <span>Complaints</span>, so as the <span>Admin</span> can look into
          the complaints and <span>Resolve</span> accordingly. <br />
          <div style={{ marginTop: "1rem" }}>
            The app has 3 main Components:
          </div>
          <ul>
            <li>Buzz</li>
            <li>Complaints</li>
            <li>Resolve (Admin only)</li>
          </ul>
          <div className={classes.Component}>
            <h3>Buzz</h3>
            The Buzz component allows user to share information regarding any
            Activity that is going on in the office or can post an article in
            Lost and Found category. <br />
            The 2 main categories in Buzz are:
            <ul>
              <li>Activity Buzz</li>
              <li>Lost & Found Buzz</li>
            </ul>
            The user can add an image along with the post.
          </div>
          <div className={classes.Component}>
            <h3>Complaints</h3>
            User can share their Complaints directly with the Admin who can then
            Resolve the complaint accordingly. User can select the department
            for which the complaint is assosiated with and can fill in the
            details along with an image if required. <br />
            The departments can be:
            <ul>
              <li>HR</li>
              <li>IT</li>
              <li>Admin</li>
              <li>Infra</li>
            </ul>
          </div>
          <div className={classes.Component}>
            <h3>Resolve</h3>
            This section is only accessible by Admin who has the rights to
            review the Complaints and take actions accordingly. The Admin
            selects the assignee for the Complaint and updates the status of the
            complaints accordingly.
          </div>
          <div className={classes.AboutDev}>
            <h3>
              About the Developer
              <FaUserCog style={{ marginLeft: "0.5rem", fontSize: "1.2rem" }} />
            </h3>
           <div className={classes.DevDetails}>
             <div className={classes.Data}>
              The app is developed by <span>Sanchit Sachdeva</span> under the guidance of mentors at <span>ToTheNew</span>. <br/>
              The app is developed using the following technology stack:
              <ul>
                <li>ReactJS</li>
                <li>MongoDB</li>
                <li>NodeJS</li>
                <li>ExpressJS</li>
              </ul>
             </div>
             <div className={classes.DevImage}></div>
           </div>
          </div>
        </div>
      </div>
    </BoxLayout>
  );
};

export default About;
