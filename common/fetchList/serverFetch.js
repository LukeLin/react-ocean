
export default {
    getVote(opts, req){
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
