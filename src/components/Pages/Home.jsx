import Container from "../UI/Container";
import Header from "../UI/Header";
import styles from "./Home.module.css";
import React from "react";

const homeContent = [
  {
    title: "Login/Register",
    desc: "User can login into the system with the registered credentials.",
  },
  {
    title: "Manage Bank Accounts",
    desc: "User can add / removed their bank accounts in the database.",
  },
  {
    title: "Upload Statement",
    desc: "Users can select their bank account and upload their statements in excel format into the system.",
  },
  {
    title: "Spend Analysis",
    desc: "Users can generate spend analysis on the uploaded statement for a specific account and a date period.",
  },
  {
    title: "Add Bank Details (Admin Only)",
    desc: "Admin users can maintain the Bank names and the format of excel statement to assist the system in uploading the data into the system.",
  },
];

const Home = (props) => {
  const mapHomeContent = (content) => {
    return (
      <div className={styles.row}>
        <span className={styles["bold-span"]}>{content.title}</span>
        <span className={styles["normal-span"]}>{content.desc}</span>
      </div>
    );
  };

  return (
    <React.Fragment>
      <Header>Introduction</Header>
      <Container className={styles.container}>
        <div className={styles.intro}>
          This application is developed to create spend analysis of the bank
          statements uploaded by the users :
        </div>
        {homeContent.map(mapHomeContent)}
      </Container>
    </React.Fragment>
  );
};

export default Home;
