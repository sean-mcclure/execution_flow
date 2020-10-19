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

@track
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

Here we will call `funct1`, then `funct5`: 

```
funct1()
funct5()
```

This will automatically download a `flow.json` to our root diectory. We can inspect this file manually, or we can visualize it graphically as outlined in the next section.

The JSON file for our program above looks like this:

```
{
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

This is a standard JSON representation that can be paired with visualization libraries like D3.js. 

Notice how the *nesting* in the JSON captures the *dependencies* of the function execution. 

# Visualizing Executions Flows

**execution_flow** comes pre-baked with a hierarchical tree viewer. You can visualize your execution flows directly in a Jupyter Notebook cell or in a dedicated browser tab.

To visualize your execution flow in **Jupyter**, simply embed the following iframe in any cell:

```
from IPython.display import IFrame
IFrame(src="https://collaboratescience.com/execution_flow/", width='100%', height='500px')
```

This will run the ExecutionFlow application inside your Jupyter notebook. Upload your flow.json file to this application to draw your execution flow graphically.

To visualize your execution flow in a dedicated **browser** tab (better for larger flows) call the `show` method on the Tracker class along with the "browser" argument:

```Tracker.show("browser")```

# Testing

Run tests with the following command:

```python setup.py test```