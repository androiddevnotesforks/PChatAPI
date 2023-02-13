import { Schema,Types,model } from 'mongoose'


interface Room {
     user1: string;
     user2: string;
     roomId: Types.ObjectId
}

const RoomModel = new Schema<Room>({
     user1: {
          type: String,
          required: true
     },

     user2: {
          type: String,
          required: true
     },
     roomId: {
          type: Schema.Types.ObjectId,
     }
})


export default model<Room>('rooms', RoomModel)
