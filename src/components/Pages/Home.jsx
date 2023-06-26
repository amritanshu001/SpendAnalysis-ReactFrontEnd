import Container from "../UI/Container";
import Header from "../UI/Header";
import styles from "./Home.module.css";
import React from "react";

const homeContent = [
  {
    id: "01",
    title: "Login/Register",
    desc: "User can register themselves on the site and set their password OR can login into the system with the registered credentials.",
  },
  {
    id: "02",
    title: "Manage Bank Accounts",
    desc: "User can add / removed their bank accounts in the database.",
  },
  {
    id: "03",
    title: "Upload Statement",
    desc: "Users can select their bank account and upload their statements in excel format into the system.",
  },
  {
    id: "04",
    title: "Spend Analysis",
    desc: "Users can generate spend analysis on the uploaded statement for a specific account and a date period.",
  },
  {
    id: "05",
    title: "Add Bank Details (Admin Only)",
    desc: "Admin users can maintain the Bank names and the format of excel statement to assist the system in uploading the data into the system.",
  },
];

const Home = (props) => {
  const mapHomeContent = (content) => {
    return (
      <div className={styles.row} key={content.id}>
        <span className={styles["bold-span"]}>{content.title}</span>
        <span className={styles["normal-span"]}>{content.desc}</span>
      </div>
    );
  };

  // throw new Error(" a new error");

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
