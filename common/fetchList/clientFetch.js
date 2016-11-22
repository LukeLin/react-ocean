
export default {
    getVote(opts){
        return new Promise(() => {
            setTimeout(() => {
                resolve({
                    data: {
                        test: 123
                    }
                });
            }, 500);
        });
    }
};
