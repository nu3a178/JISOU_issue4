export class Skill {
  public id: string;
  public name: string;

  constructor(props: Skill) {
    const { id, name } = props;
    this.id = id;
    this.name = name;
  }
}
