import db from './index';

const query = (queries, params) => {
    return new Promise((resolve, reject)=>{
        db.query(queries, params, (err, result)=>{
            if(err) {
                return reject(err)
            }
            return resolve(result)
        })
    })
}

export default query;