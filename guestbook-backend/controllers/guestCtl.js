const Guest = require('../models/guests-model');

class guestCtl {

    addGuest(req, res) {
        new Guest({
            Name: req.body.arr.Name,
            Body: req.body.arr.Body,
            Image: req.body.arr.Image

        })
            .save()
            .then((newGuest) => {
                res.send(newGuest)
                console.log(newGuest)
            })
    };

    loadAllGuets(req, res) {
        Guest.find({})
            .then((AllGuests) => {
                if (AllGuests) {
                    res.send(Object.values(AllGuests));
                }
            })
    };

    deleteGuest(guestid, req, res) {
        Guest.deleteOne({
            _id: guestid
        })
            .then((deleted) => {
                res.send(deleted)
            })
    };
}

module.exports = new guestCtl;