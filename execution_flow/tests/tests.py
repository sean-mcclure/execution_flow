from unittest import TestCase
from execution_flow.tracker import *

def test_tracking():

    @track
    def funct1():
        num = 100
        res = funct2(num)
        print(res)

    @track
    def funct2(num):
        num = num*100
        res = funct3(num)
        return(res)

    @track
    def funct3(num):
        num = num*100
        res = funct4(num)
        return(res)

    @track
    def funct4(num):
        res = num*100
        return(res)

    @track
    def funct5():
        res = "I am function 5"
        print(res)

    Tracker.project_name(track, "My Project")
    funct1()
    funct5()

    with open("flow.json") as f:
        flow_dict = json.load(f)

    assert len(flow_dict.keys()) == 2