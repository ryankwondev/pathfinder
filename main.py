from fastapi import FastAPI
from sqlmodel import Session, SQLModel, create_engine, Field
from typing import Optional
from pydantic import BaseModel
from collections import defaultdict
from heapq import heappush, heappop
import heapq


class Edge(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    start_point: str
    end_point: str
    move_minutes: int
    description: Optional[str] = None


# sqlmodel
sqlite_file_name = "database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"
engine = create_engine(sqlite_url)
SQLModel.metadata.create_all(engine)

# fastapi
app = FastAPI()


@app.get("/edges")
def read_edges():
    with Session(engine) as session:
        edges = session.query(Edge).all()
        return edges


@app.post("/edges")
def create_edge(loc1: str, loc2: str, minutes: int, description: Optional[str] = None):
    edge = Edge(start_point=loc1, end_point=loc2, move_minutes=minutes, description=description)
    with Session(engine) as session:
        session.add(edge)
        session.commit()
        session.refresh(edge)
        return edge


@app.get("/search_route")
def search_route(loc1: str, loc2: str):
    with Session(engine) as session:
        edges = session.query(Edge).all()
        routes = []
        for edge in edges:
            routes.append((edge.start_point, edge.end_point, edge.move_minutes))
            routes.append((edge.end_point, edge.start_point, edge.move_minutes))

        # dijkstra
        def dijkstra(edges, f, t):
            g = defaultdict(list)
            for l, r, c in edges:
                g[l].append((c, r))
            q, seen = [(0, f, [])], set()
            while q:
                (cost, v1, path) = heapq.heappop(q)
                if v1 not in seen:
                    seen.add(v1)
                    path = path + [v1]
                    if v1 == t:
                        return (cost, path)
                    for c, v2 in g.get(v1, ()):
                        if v2 not in seen:
                            heapq.heappush(q, (cost + c, v2, path))
            return float("inf")

        # A*
        def astar(graph, start, goal):

            graph = defaultdict(list)
            for start, end, weight in routes:
                graph[start].append((weight, end))

            def astar_search(graph, start, goal):
                visited = set()
                queue = []
                heappush(queue, (0, start, [start]))
                while queue:
                    (cost, node, path) = heappop(queue)
                    if node not in visited:
                        visited.add(node)
                        if node == goal:
                            return cost, path
                        for weight, neighbour in graph[node]:
                            if neighbour not in visited:
                                heappush(queue, (cost + weight, neighbour, path + [neighbour]))
                return 0, []

            return astar_search(graph, start, goal)

        # return dijkstra(routes, loc1, loc2)
        return astar(routes, loc1, loc2)


@app.delete("/edges/{edge_id}")
def delete_edge(edge_id: int):
    with Session(engine) as session:
        edge = session.get(Edge, edge_id)
        session.delete(edge)
        session.commit()
        return {"message": "Edge deleted successfully!"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
