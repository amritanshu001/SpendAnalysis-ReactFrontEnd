const homeContent = [
    {
      id: "01",
      title: "Login/Register",
      description:
        "User can register themselves on the site and set their password OR can login into the system with the registered credentials.",
    },
    {
      id: "02",
      title: "Manage Bank Accounts",
      description: "User can add / removed their bank accounts in the database.",
    },
    {
      id: "03",
      title: "Upload Statement",
      description:
        "Users can select their bank account and upload their statements in excel format into the system.",
    },
    {
      id: "04",
      title: "Spend Analysis",
      description:
        "Users can generate spend analysis on the uploaded statement for a specific account and a date period.",
    },
    {
      id: "05",
      title: "Admin Page (Restricted Access)",
      description:
        "Users with admin access can perform various admin tasks like: ",
      subtasks: [
        {
          id:"05.01",
          title: "Maintain Bank Details",
          description:"Maintain (add/edit/delete) the Bank names and the format of excel statement to assist the system in uploading the data into the system."
        },
        {
          id:"05.02",
          title: "Maintain Inactive Accounts",
          description:"Reactivate or permanently delete inactive accounts."
        },
        {
          id:"05.03",
          title: "Maintain Date Formats",
          description:"Maintain date formats for application to parse the uploaded statements correctly."
        },
        {
          id:"05.04",
          title: "Maintain Users",
          description:"Delete user's registration permanently based on user request."
        }
      ]
    },
  ];

  const metaData = [
    {
        path: "/",
        title:"Spend Analysis - Home Page", 
        description: "Spend Analysis app lets you upload your bank statements and then provides comprehensive spend analysis to manage your money"
    },
    {
      path: "/login",
      title: "Login/Register",
      description:
        "User can register themselves on the site and set their password OR can login into the system with the registered credentials.",
    },

    {
      path: "/manageaccount",
      title: "Manage Bank Accounts",
      description: "User can add / removed their bank accounts in the database.",
    },
    {
      path: "/uploadstatement",
      title: "Upload Statement",
      description:
        "Users can select their bank account and upload their statements in excel format into the system.",
    },
    {
      path: "/spendanalysis",
      title: "Spend Analysis",
      description:
        "Users can generate spend analysis on the uploaded statement for a specific account and a date period.",
    },
    {
      path: "/admin/addbank",
      title: "Add Bank Details",
      description:
        "Admin users can maintain the Bank names and the format of excel statement to assist the system in uploading the data into the system.",
    },
    {
      path: "/admin/accounts",
      title: "Manage Inactive Accounts",
      description:
        "Admin users can reactivate or permanently delete inactive accounts.",
    },
    {
      path: "/admin/dateformats",
      title: "Maintain Date Formats",
      description:"Maintain date formats for application to parse the uploaded statements correctly.",
    },
    {
      path: "/admin/users",
      title: "Maintain Users",
      description:"Delete user's registration permanently based on user request."
    },
    {
        path: "/request-resetpassword",
        title: "Request Reset Password",
        description:
          "Users can request for password reset via registered mail",
      },

      {
        path: "/request-resetpassword/:hash",
        title: "Reset Password",
        description:
          "Users can reset password based on the link sent on the mail",
      },
  ];

  export const higherMetaData = metaData.map((page)=>{
    return {
        ...page, type:"summary", name:"Amritanshu"
    }
  })

  export default homeContent