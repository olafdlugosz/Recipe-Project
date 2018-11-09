


    const formatNumberToTwoDecimalPlaces = (total: number) => {
        let tot = total.toString();
        if (tot.indexOf(".") > -1) {
          let totArray = tot.split(".");
          let finalString = totArray[0] + "." + totArray[1].substring(0, 2);
          return finalString;
        } else {
          return tot;
        }
      }

      export {formatNumberToTwoDecimalPlaces as default};

