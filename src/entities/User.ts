import { Replace } from '@helpers/Replace';
import { v4 as uuid } from 'uuid';

export interface UserProps {
  name: string;
  email: string;
  password: string;
  created_at: Date;
}

export class User {
  private _id: string;
  private props: UserProps;

  constructor(props: Replace<UserProps, { created_at?: Date }>, id?: string) {
    this._id = id ?? uuid();
    this.props = {
      ...props,
      created_at: props.created_at ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public get created_at(): Date {
    return this.props.created_at;
  }

  public get name(): string {
    return this.props.name;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get email(): string {
    return this.props.email;
  }

  public set email(email: string) {
    this.props.email = email;
  }

  public get password(): string {
    return this.props.password;
  }

  public set password(password: string) {
    this.props.password = password;
  }
}
