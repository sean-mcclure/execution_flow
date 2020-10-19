from setuptools import setup

setup(name='execution_flow',
      version='0.1',
      description='A library for tracking the execution flow of Python functions.',
      url='https://github.com/sean-mcclure/execution_flow',
      author='Sean McClure',
      author_email='sean.mcclure@kedion.ai',
      license='MIT',
      packages=['execution_flow'],
      install_requires=[
          'ipython'
      ],
      test_suite='nose.collector',
      tests_require=['nose'],
      zip_safe=False)