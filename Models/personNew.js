const mongoose = require('mongoose')
const Schema = mongoose.Schema;


// Guest schema
const GuestSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true }
  });
  
  // Room Schema
  const RoomSchema = new Schema({
    number: { type: Number, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: String, required: true, enum: ['available', 'occupied', 'maintenance'] }
  });
  
  // Reservation Schema
  const ReservationSchema = new Schema({
    guest: { type: Schema.Types.ObjectId, ref: 'Guest', required: true },
    room: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true }
  });
  
  // Payment Schema
  const PaymentSchema = new Schema({
    reservation: { type: Schema.Types.ObjectId, ref: 'Reservation', required: true },
    amount: { type: Number, required: true },
    paymentDate: { type: Date, default: Date.now }
  });
  
  // Staff Schema
  const StaffSchema = new Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true }
  });

const Guest =mongoose.model('Guest',GuestSchema) ;
const Room = mongoose.model('Room', RoomSchema);
const Reservation = mongoose.model('Reservation', ReservationSchema);
const Payment = mongoose.model('Payment', PaymentSchema);
const Staff = mongoose.model('Staff', StaffSchema);

module.exports = {
    Guest,
    Room,
    Reservation,
    Payment,
    Staff
  };