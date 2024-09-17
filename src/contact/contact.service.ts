import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { Contact } from './schemas/contact.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(Contact.name) private readonly contactModel: Model<Contact>,
  ) {}

  async handleContact(createContactDto: CreateContactDto): Promise<Contact> {
    console.log('Received contact form data:', createContactDto);

    // Create a new contact document
    const newContact = new this.contactModel(createContactDto);

    // Save the contact document to MongoDB
    return await newContact.save();
  }
}
