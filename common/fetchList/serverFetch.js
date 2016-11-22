
export default {
    getVote(opts, req){
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
