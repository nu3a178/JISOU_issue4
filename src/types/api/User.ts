abstract class URLFactory {
  abstract createUrl(id: string): string;
}

class GithubURLFactory extends URLFactory {
  createUrl(id: string): string {
    return `https://github.com/${id}`;
  }
}

class QiitaURLFactory extends URLFactory {
  createUrl(id: string): string {
    return `https://qiita.com/${id}`;
  }
}

class XURLFactory extends URLFactory {
  createUrl(id: string): string {
    return `https://x.com/${id}`;
  }
}

export class User {
  public id: string;
  public name: string;
  public description: string;
  public githubId?: string;
  public qiitaId?: string;
  public xId?: string;
  public githubUrl?: string;
  public qiitaUrl?: string;
  public xUrl?: string;
  public skills?: string[];

  constructor(props: User) {
    const { id, name, description, githubId, qiitaId, xId, skills } = props;
    this.id = id;
    this.name = name;
    this.description = description;
    this.githubId = githubId;
    this.qiitaId = qiitaId;
    this.xId = xId;
    this.skills = skills;

    const githubFactory = new GithubURLFactory();
    const qiitaFactory = new QiitaURLFactory();
    const xFactory = new XURLFactory();

    if (githubId) this.githubUrl = githubFactory.createUrl(githubId);
    if (qiitaId) this.qiitaUrl = qiitaFactory.createUrl(qiitaId);
    if (xId) this.xUrl = xFactory.createUrl(xId);
  }
}
