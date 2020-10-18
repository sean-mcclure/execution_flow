# ExecutionFlow

ExecutionFlow allows you to track your Python functions, making it easier to schedule, test and visualize pipelines. ExecutionFlow works with Jupyter Notebooks/Lab by hosting a visualization frame inside your notebook.

# Install

You can install ExecutionFlow directly from this repo by running the following in a Jupyter Cell:

```pip install```

# Examples

If running in Jupyter, you can do this:

```
%run tracker.py

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
Then in another cell, call your functions:

```
Tracker.project_name(track, "Ford MVP")
funct1()
funct5()
```
