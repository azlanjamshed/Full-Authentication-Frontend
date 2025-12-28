const getErrorMessage = (error) => {
    if (error.response && error.response.data) {
        return error.response.data.message || "Something went wrong";
    }

    if (error.request) {
        return "Server not responding. Try again later.";
    }

    return "Unexpected error occurred";
};

export default getErrorMessage;
