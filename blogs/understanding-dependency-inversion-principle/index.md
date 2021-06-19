---
title: "Understanding SOLID: Dependency Inversion Principle"
date: "June 19, 2021"
category: "Software Engineering"
tech: "NGINX, Apache"
featuredImg: "/understanding-dependency-inversion-principle/cover.png"
---

![Image](/understanding-dependency-inversion-principle/cover.png)

## What is the dependency inversion principle?

The dependency inversion principle is one of the standard guiding rules of software design and development to ensure component extensibility and loosely-coupled components.

Simply said, the dependency inversion principle states that we need to rely on abstractions rather than concrete implementations.

## What is system coupling?

System coupling is defined as the constraining state of one item to another item inside a system. Coupling occurs on context information. For example, in an air-conditioner, the compressor is said to be coupled to the internal cooling refridgerant and cooling mechanism, since these components together make up the entirety of the cooling system.

## Tightly-coupled vs. loosely-coupled components?

Coupling can be of two types: **tight coupling** and **loose coupling**. These refer to how a system would react in presence of a substitute of a certain component/module.

In our example before, if the cooling mechanism of the air condition was "tightly-coupled" to the compressor, then substitution of the compressor made by other companies are **highly likely to break the cooling mechanism entirely**. This would be an example of a tightly-coupled component system. Tightly-coupled components have concrete, hard-coded implementations.

Loose coupling is the _exact opposite_ of the example above, where replacement of a system with one of a similar function but of different _constitution_/_implementation_, will ensure that the system works as these.

## Let's look at a code example now

Following with our analogy from before, we define a simple **AirConditioner** class:

```ts
class CompressorV1 {
  constructor() {
    console.log("Compressor V1");
  }

  setup() {
    // perform some necessary setup task
  }

  turnOn() {
    this.setup();
    // function code
  }
}

class AirConditioner {
  private compressor: Compressor = new CompressorV1();

  constructor() {}

  public powerOn() {
    this.compressor.turnOn();
  }
}
```

The **CompressorV1** object is a **direct dependency** in this **AirConditioner** class. If a new modification was to be made according to our analogy, this would break the **AirConditioner** class as it doesn't have a way to extend functionality to operate with a new Compressor type. Without implementing the dependency inversion principle, this would be the future snapshot of the code, if a new compressor **CompressorV2** was introduced to the air conditioner:

```ts
class CompressorV2 {
  constructor() {
    console.log("Compressor V2");
  }

  setup() {
    // perform some necessary setup task
  }

  turnOn() {
    this.setup();
    // function code
  }
}

class AirConditioner {
  private compressor: Compressor = new CompressorV1();
  private compressor2: CompressorV2 = new CompressorV2();

  constructor(private activeCompressor = 1) {}

  public powerOn() {
    if (activeCompressor == 1) {
      this.compressor.turnOn();
    } else {
      this.compressor2.turnOn();
    }
  }
}
```

_The problem suddenly becomes evident_.

The code **won't scale well** upon addition of a multitude of different components that are core dependencies in the **AirConditioner** class and may need to be replaced in the future. And even if the components don't need replacement, using **if-else** blocks in this way is not good for production code. It is a known fact that the more the decision branches are encountered during code execution, the slower the execution will be.

## Inversion of control (IoC)

From the above example, we see that the **AirConditioner** class is in charge of instantiating and managing the compressor objects. This results in a tedious type of code pattern, where everytime a new **Compressor** was introduced, someone would have to modify the **AirConditioner** class to **support** the new **Compressor** type.

However, let's look from a different angle. Instead of letting the **AirConditioner** class handle the lifecycle of the compressor objects, we define an _abstract_ compressor interface that handles it for the **AirConditioner**. We'll name this interface **ICompressor** (adding an **I** in front is just a naming convention for interfaces).

Why an **interface**, you ask? An interface allows us to _define_ a particular type of function, _without actually implementing it_. Thus, we define an interface of a compressor that has the declaration of "setup" and "turnOn" but not the definition of it.

```ts
interface ICompressor {
  setup(config?: any): any;
  turnOn(): any;
}
```

Each compressor class would now implement this interface. The resulting code:

```ts
class CompressorV1 implements ICompressor {
  constructor() {
    console.log("CompressorV1 is in system");
  }

  setup(config?: any): any {
    // perform the very same setup tasks in this interface function
  }

  turnOn(): void {
    // same function code
  }
}

class CompressorV2 implements ICompressor {
  constructor() {
    console.log("Compressor V2 is in system");
  }

  setup(config?: any): any {
    // perform the same necessary setup task
  }

  turnOn(): void {
    // same function code as before
  }
}
```

Moreover, the **AirConditioner** class looks much cleaner with this elegant interface design:

```ts
class AirConditioner {
  constructor(private compressor: ICompressor) {}

  public powerOn() {
    this.compressor.turnOn();
  }
}
```

If we were to run our program now, this is how it'd look:

```ts
class Main {
  static main(args: string[]): Number {
    const ac: AirConditioner = new AirConditioner(new CompressorV1());
    ac.powerOn();
  }
}
```

What we did just now is known as **Inversion of Control**. This process removes the dependency of the **AirConditioner** on the **Compressor** classes. So to generalize, we have **inverted** the **dependency control flow** where the higher level module (**AirConditioner** class) was depending on the lower level module (**CompressorV1** / **CompressorV2** classes) by introducing an _even higher level abstraction_ (**ICompressor**).

## One more example

Now in our above air conditioner case, it is not uncommon that a complex behavior may be introduced. Suppose, a third type of compressor came along and we need to provide support for this type of compressor in our ACs as well. But the setup process for this compressor is a bit different. Unlike the first two types that had completely offline setup processes, this one has a remote connection module that is needed to be configured for the compressor system resource monitoring before the compressor can be turned on.

The third compressor therefore has a different internal setup behavior as it relies on an asynchronous request to finish before its setup task can be completed.

Thanks to the implementation that now uses a higher level abstration, this new type of compressor can be very easily integrated in our air conditioners. We simply implement one more **Compressor** class in the following way, but this time the **turnOn** function is implemented as an **async** function. This is a completely valid modification as interfaces only ever care about the signature of the function and never about _how the function is implemented_.

```ts
class SmartCompressor implements ICompressor {
  constructor() {
    console.log("Smart Compressor is in system");
  }

  loadConfiguration(): any {
    //function to load connection configuration
  }

  setup(config?: any): Promise<any> {
    // perform the same necessary setup task
  }

  async turnOn(): void {
    const configObject = loadConfiguration();
    try {
      await this.setup(configObject);
      // function code to turn on compressor
    } catch (err) {
      // catch error if connection fails
      console.log(err.message);
    }
  }
}
```

Even though the process of setting up the compressor is very different this time, dependency inversion ensures this new addition will not need a complete re-iteration of our system (notice how we don't even have to touch our **AirConditioner** class this time), thus saving us time and the loss of sanity. This system has now been converted to a loosely-coupled system with the help of the dependency inversion principle.

## Conclusion

In summary, this is what the **Dependency Inversion Principle** states and intends to implement. It is clearly visible how and why loosely coupled architectures favor this principle to be staged in place and also why it made the list on the **S.O.L.I.D** software design principles.
