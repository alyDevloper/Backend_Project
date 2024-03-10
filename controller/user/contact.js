import ContactModel from "../../model/user/contact.js";

const ContactController = {
  update: async (req, res) => {
    try {
      const contact_id = req.params.contact_id;
      const contact = await ContactModel.findByPk(contact_id);

      const schema = Joi.object({
        Mobile: Joi.string().min(8).max(16).required(),
        Phone: Joi.string().min(8).max(16),
      });

      const isValidate = schema.validate(payload);
      if (isValidate.error) {
        return res
          .status(400)
          .json({ message: "Invalid data", error: isValidate.error });
      }

      if (!contact) {
        return res.status(404).json({
          message: "No contact found",
        });
      }

      contact.Mobile = req.body.Mobile;

      await contact.save();

      res.json({
        contact,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Something bad happened to server",
      });
    }
  },

  delete: async (req, res) => {
    try {
      const contact_id = req.params.contact_id;

      const DeletedContact = await ContactModel.destroy({
        where: { id: contact_id },
      });

      if (DeletedContact === 1) {
        return res.status(200).json({
          message: "Contact deleted successfully",
        });
      } else {
        return res.status(404).json({
          message: "Contact not found",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Something bad happened to server",
      });
    }
  },
};

export default ContactController;
