import json

track_functs = {}
track_functs["children"] = []

class Tracker:
    
    level = 0

    def __init__(self):
        self.project_name = ""
        
    def project_name(self, project_name):
        track_functs["name"] = project_name

    def __call__(self, fn):
        def wrapper(*args, **kwargs):
            if(self.level == 0):
                inner = {}
                inner["name"] = (fn.__name__)
                inner["children"] = []
                track_functs["children"].append(inner)
            if(self.level == 1):
                inner_b = {}
                inner_b["name"] = (fn.__name__)
                inner_b["children"] = []
                track_functs["children"][0]["children"].append(inner_b)
            if(self.level == 2):
                inner_c = {}
                inner_c["name"] = (fn.__name__)
                inner_c["children"] = []
                track_functs["children"][0]["children"][0]["children"].append(inner_c)
            if(self.level == 3):
                inner_d = {}
                inner_d["name"] = (fn.__name__)
                inner_d["children"] = []
                track_functs["children"][0]["children"][0]["children"][0]["children"].append(inner_d)
            if(self.level == 4):
                inner_e = {}
                inner_e["name"] = (fn.__name__)
                inner_e["children"] = []
                track_functs["children"][0]["children"][0]["children"][0]["children"][0]["children"].append(inner_d)
            if(self.level == 5):
                inner_f = {}
                inner_f["name"] = (fn.__name__)
                inner_f["children"] = []
                track_functs["children"][0]["children"][0]["children"][0]["children"][0]["children"][0]["children"].append(inner_d)
            if(self.level == 6):
                inner_g = {}
                inner_g["name"] = (fn.__name__)
                inner_g["children"] = []
                track_functs["children"][0]["children"][0]["children"][0]["children"][0]["children"][0]["children"][0]["children"].append(inner_d)
            self.level += 1
            out = fn(*args, **kwargs)
            self.level -= 1
            
            with open('flow.json', 'w') as fp:
                json.dump(track_functs, fp, indent=2)
            
            return out
        return wrapper
    
track = Tracker()