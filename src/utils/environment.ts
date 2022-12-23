enum ModePostfix {
    Development = "Dev",
    Test="Test"
  }
export const postfix = (title:string): string => {
    const postfix = process.env.NODE_ENV && ModePostfix[process.env.NODE_ENV.trim()];
  return postfix ? postfix+title : title;
};
