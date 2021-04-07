import React from "react";
import ReactDOM from "react-dom";
import scriptLoader from "react-async-script-loader";
import axios from "axios";
import PayementSuccess from "./PayementSuccess";

const CLIENT = {
  sandbox:
    "AXGh6RDCdmzM5NTE5GqbFFW_VB6u-udbbNfe0hXGdDVcUM8XEGDlQwpA0HtnNZgtzsLhTz9WXVpGAO0B",
  production: "your client id",
};

const CLIENT_ID =
  process.env.NODE_ENV === "production" ? CLIENT.production : CLIENT.sandbox;

let PayPalButton = null;
class PaypalButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showButtons: false,
      loading: true,
      paid: false,
      checkoutAddress: {},
    };

    window.React = React;
    window.ReactDOM = ReactDOM;
  }

  componentDidMount() {
    const {
      isScriptLoaded,
      isScriptLoadSucceed,
      checkoutAddress,
      id,
    } = this.props;

    this.setState({ checkoutAddress: JSON.parse(this.props.checkoutAddress) });
    console.log(JSON.parse(this.props.checkoutAddress).totalPrice);
    console.log(id);

    if (isScriptLoaded && isScriptLoadSucceed) {
      PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
      this.setState({ loading: false, showButtons: true });
    }
  }

  updateTurnOver = async (id) => {
    await axios
      .patch("http://localhost:4000/seller/seller/" + id, {
        turnOver: JSON.parse(this.props.checkoutAddress).totalPrice,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  patchProduct = async (id) => {
    await axios
      .patch("http://localhost:4000/product/" + id, {})
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  componentWillReceiveProps(nextProps) {
    const { isScriptLoaded, isScriptLoadSucceed } = nextProps;

    const scriptJustLoaded =
      !this.state.showButtons && !this.props.isScriptLoaded && isScriptLoaded;

    if (scriptJustLoaded) {
      if (isScriptLoadSucceed) {
        PayPalButton = window.paypal.Buttons.driver("react", {
          React,
          ReactDOM,
        });
        this.setState({ loading: false, showButtons: true });
      }
    }
  }
  createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          description: "",
          amount: {
            currency_code: "USD",
            value: JSON.parse(this.props.checkoutAddress).totalPrice,
          },
        },
      ],
    });
  };

  onApprove = (data, actions) => {
    actions.order.capture().then((details) => {
      const paymentData = {
        payerID: data.payerID,
        orderID: data.orderID,
      };
      this.props.createOrder();
      this.patchProduct(this.props.id);
      console.log("Payment Approved: ", paymentData);
      this.setState({ showButtons: false, paid: true });
      this.updateTurnOver(JSON.parse(this.props.checkoutAddress).id_seller);
    });
  };

  render() {
    const { showButtons, loading, paid, checkoutAddress } = this.state;

    return (
      <div className="main mt-5">
        {showButtons && (
          <div>
            <PayPalButton
              createOrder={(data, actions) => this.createOrder(data, actions)}
              onApprove={(data, actions) => this.onApprove(data, actions)}
            />
            <div></div>
          </div>
        )}

        {paid && <PayementSuccess />}
      </div>
    );
  }
}

export default scriptLoader(
  `https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}`
)(PaypalButton);
