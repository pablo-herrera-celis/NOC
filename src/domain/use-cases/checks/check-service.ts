interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SucessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {
  constructor(
    private readonly sucessCallback: SucessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  public async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);
      if (!req.ok) throw new Error(`Service is down ${url}`);
      this.sucessCallback();
      return true;
    } catch (error) {
      console.log(`${error}`);
      this.errorCallback(`${error}`);
      return false;
    }
  }
}
