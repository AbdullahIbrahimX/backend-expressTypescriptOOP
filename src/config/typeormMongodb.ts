import User from "../Entities/User";

export default {
    type: 'mongodb',
    host: 'localhost',
    port: 27017,
    database: 'abdullahalsafwan',
    entities: [User],
    synchronize: true,
    logging: true,
    useUnifiedTopology:true
};
