useEffect(() => {
  let componentMounted = true;

  const action = setInterval(() => {
    const getSingleOrder = async (orderId) => {
      try {
        // setLoadingSingleOrder(true);
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const {
          data: { order },
        } = await axios.get(
          `${ORDER_BASE_URL}/GetOrder/GetOrderByOrderId/${orderId}`,
          config
        );

        // setLoadingSingleOrder(false);

        if (componentMounted) {
          setSingleOrder(order);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getSingleOrder(orderId);
    console.log("checking for status...");
  }, 2000);
  return () => {
    clearInterval(action);
    componentMounted = false;
  };
}, []);
