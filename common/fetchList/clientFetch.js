
export default {
    getVote(opts){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    data: {
                        message: 123
                    }
                });
            }, 500);
        });
    }
};
