from setuptools import setup

setup(
	name='Web Pokemon Game',
	version='1.0',
	packages=['api'],
	include_package_data=True,
	install_requires=[
		'fastapi',
		'requests',
		'sqlalchemy',
		'nodeenv',
		'uvicorn'
	],
)