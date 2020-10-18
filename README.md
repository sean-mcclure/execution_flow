# ExecutionFlow

ExecutionFlow allows you to track your Python functions, making it easier to schedule, test and visualize pipelines. ExecutionFlow works with Jupyter Notebooks/Lab by hosting a visualization frame inside your notebook.

# Install

You can install ExecutionFlow directly from this repo by running the following:

```pip install git+https://github.com/sean-mcclure/execution_flow```

# Import

Import execution_flow as follows:

```from execution_flow.tracker import *```

# Examples

Below is an example with 5 functions. In order to track these functions during execution we decorate each of them with the `@track` decorator as follows:

```
from execution_flow.tracker import *

<span style='color:purple'>@track</span>
def funct1():
    res = funct2()
    print(res)

@track
def funct2():
    factor = 3
    res = funct3(factor)
    return(res)

@track
def funct3(factor):
    temp = funct4()
    res = 1 + 100*factor + temp
    return(res)

@track
def funct4():
    res = 1 + 100
    return(res)

@track
def funct5():
    res = "hello"
    print(res)

```

Note how `funct1` calls `funct2`, which calls `funct3`, which calls `funct4`. Finally, `funct5` is by itself, and gets called last. This is the execution flow we expect to be reported by execution_flow. 

To run execution_flow, we simply call the functions.

Here we will call `funct1`, then `funct5`. We can also provide a project_name to the Tracker class: 

```
Tracker.project_name(track, "My Project")
funct1()
funct5()
```

This will automatically download a `flow.json` to our root diectory. We can inspect this file manually, or we can visualize it graphically as outlined in the next section.

The JSON file for our program above looks like this:

```
{
  "name": "My Project",
  "children": [{
    "name": "funct1",
    "children": [{
      "name": "funct2",
      "children": [{
        "name": "funct3",
        "children": [{
          "name": "funct4",
          "children": []
        }]
      }]
    }]
  }, {
    "name": "funct5",
    "children": []
  }]
}
```

Notice how the *nesting* in the JSON representation captures the dependencies of the function execution. 

# Visualizing Executions Flows

To visualize your execution flow, upload the flow.json file to ExecutionFlow:

- add gif
- show image of flow