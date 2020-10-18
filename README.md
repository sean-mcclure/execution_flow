# ExecutionFlow

ExecutionFlow allows you to track your Python functions, making it easier to schedule, test and visualize pipelines. ExecutionFlow works with Jupyter Notebooks/Lab by hosting a visualization frame inside your notebook.

# Install

You can install ExecutionFlow directly from this repo by running the following:

```pip install git+https://github.com/sean-mcclure/execution_flow```

# Import

Import execution_flow as follows:

```from execution_flow.tracker import *```

# Examples

Below is an example with 5 functions. Note how funct1 calls funct2, which calls funct3, which finally calls funct4. funct5 is by itself.

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

This will automatically download a flow.json to your root diectory. To visualize your execution flow, upload the flow.json file to ExecutionFlow:

- add gif
- show image of flow